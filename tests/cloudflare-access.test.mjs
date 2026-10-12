import { test, after } from "node:test";
import assert from "node:assert/strict";
import { verifyAccessToken, authenticateCloudflareRequest } from "../lib/cloudflare-access.mjs";

const issuer = "https://diploy-test.cloudflareaccess.com";
const audience = "test-audience";
const pair = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const jwk = { ...await crypto.subtle.exportKey("jwk", pair.publicKey), kid: "test-key" };
const originalFetch = globalThis.fetch;
globalThis.fetch = async url => {
  assert.equal(url, `${issuer}/cdn-cgi/access/certs`);
  return Response.json({ keys: [jwk] });
};
after(() => { globalThis.fetch = originalFetch; });
const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
async function token(overrides = {}, header = {}) {
  const now = Math.floor(Date.now() / 1000);
  const body = `${encode({ alg: "RS256", kid: "test-key", ...header })}.${encode({
    iss: issuer, aud: [audience], sub: "user-123", email: "maca@example.com",
    iat: now, exp: now + 300, ...overrides,
  })}`;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(body));
  return `${body}.${Buffer.from(signature).toString("base64url")}`;
}
test("accepts a signed identity with the configured issuer and audience", async () => {
  assert.deepEqual(await verifyAccessToken(await token(), issuer, audience), {
    userId: "user-123", email: "maca@example.com",
  });
});
test("rejects missing, malformed, expired, premature and wrong-application tokens", async () => {
  for (const value of [null, "invalid", await token({ exp: 1 }), await token({ aud: ["other"] }),
    await token({ iss: "https://other.cloudflareaccess.com" }), await token({ nbf: 9e12 }),
    await token({ iat: 9e12 }), await token({}, { alg: "none" })]) {
    assert.equal(await verifyAccessToken(value, issuer, audience), null);
  }
});
test("rejects tampering with the signed identity", async () => {
  const parts = (await token()).split(".");
  const claims = JSON.parse(Buffer.from(parts[1], "base64url").toString());
  parts[1] = encode({ ...claims, email: "attacker@example.com" });
  assert.equal(await verifyAccessToken(parts.join("."), issuer, audience), null);
});
test("removes untrusted identity headers and replaces them with verified claims", async () => {
  const result = await authenticateCloudflareRequest(new Request("https://studio.example.com/api/workspace", {
    headers: { "cf-access-jwt-assertion": await token(), "oai-authenticated-user-id": "attacker",
      "oai-authenticated-user-full-name": "Forged", "oai-authenticated-user-email": "attacker@example.com" },
  }), { ACCESS_TEAM_DOMAIN: issuer, ACCESS_AUD: audience });
  assert.ok(result instanceof Request);
  assert.equal(result.headers.get("oai-authenticated-user-id"), "user-123");
  assert.equal(result.headers.get("oai-authenticated-user-email"), "maca@example.com");
  assert.equal(result.headers.get("oai-authenticated-user-full-name"), null);
});
test("denies forged headers without a token and fails closed without configuration", async () => {
  const request = new Request("https://studio.example.com/", { headers: { "oai-authenticated-user-id": "attacker" } });
  const result = await authenticateCloudflareRequest(request, { ACCESS_TEAM_DOMAIN: issuer, ACCESS_AUD: audience });
  assert.equal(result.status, 401);
  await assert.rejects(authenticateCloudflareRequest(request, {}), /not configured/);
});
test("logout redirects to Access on the current application hostname", async () => {
  const result = await authenticateCloudflareRequest(new Request("https://studio.example.com/signout-with-chatgpt", {
    headers: { "cf-access-jwt-assertion": await token() },
  }), { ACCESS_TEAM_DOMAIN: issuer, ACCESS_AUD: audience });
  assert.equal(result.status, 302);
  assert.equal(result.headers.get("location"), "https://studio.example.com/cdn-cgi/access/logout");
});
