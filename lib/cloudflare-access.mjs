// Access signs identity tokens with RS256. Only trust the configured issuer/AUD.
let keyCache;
function decode(part) {
  if (!/^[A-Za-z0-9_-]+$/.test(part)) throw new Error("Invalid JWT encoding");
  return Uint8Array.from(atob(part.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
}
const parse = part => JSON.parse(new TextDecoder().decode(decode(part)));
async function keys(issuer) {
  if (keyCache?.issuer === issuer && keyCache.expires > Date.now()) return keyCache.keys;
  const response = await fetch(`${issuer}/cdn-cgi/access/certs`, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error("Access certificates unavailable");
  const body = await response.json();
  if (!Array.isArray(body.keys)) throw new Error("Invalid Access certificates");
  keyCache = { issuer, keys: body.keys, expires: Date.now() + 300_000 };
  return body.keys;
}
export async function verifyAccessToken(token, issuer, audience) {
  if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(issuer ?? "") ||
      !audience || audience.includes("REEMPLAZAR")) throw new Error("Access is not configured");
  if (!token || token.length > 16_384) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const header = parse(parts[0]);
    const claims = parse(parts[1]);
    const now = Math.floor(Date.now() / 1000);
    if (header.alg !== "RS256" || typeof header.kid !== "string" ||
        claims.iss !== issuer || !Array.isArray(claims.aud) || !claims.aud.includes(audience) ||
        typeof claims.exp !== "number" || claims.exp <= now ||
        typeof claims.iat !== "number" || claims.iat > now + 30 ||
        (claims.nbf !== undefined && (typeof claims.nbf !== "number" || claims.nbf > now)) ||
        typeof claims.sub !== "string" || !claims.sub ||
        typeof claims.email !== "string" || !claims.email.includes("@")) return null;
    let jwk = (await keys(issuer)).find(key => key.kid === header.kid);
    if (!jwk) {
      // A rotated key may arrive before the cache expires.
      keyCache = undefined;
      jwk = (await keys(issuer)).find(key => key.kid === header.kid);
    }
    if (!jwk || jwk.kty !== "RSA") return null;
    const key = await crypto.subtle.importKey("jwk", jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key,
      decode(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    return valid ? { userId: claims.sub, email: claims.email } : null;
  } catch {
    return null;
  }
}

export async function authenticateCloudflareRequest(request, env) {
  const user = await verifyAccessToken(request.headers.get("cf-access-jwt-assertion"),
    env.ACCESS_TEAM_DOMAIN, env.ACCESS_AUD);
  if (!user) return new Response("Acceso privado. Inicia sesión mediante Cloudflare Access.", {
    status: 401, headers: { "Cache-Control": "no-store" },
  });
  const url = new URL(request.url);
  if (url.pathname === "/signout-with-chatgpt") {
    return Response.redirect(new URL("/cdn-cgi/access/logout", url.origin).href, 302);
  }
  if (url.pathname === "/signin-with-chatgpt") return Response.redirect(url.origin + "/", 302);
  const headers = new Headers(request.headers);
  for (const name of [...headers.keys()]) {
    if (name.startsWith("oai-authenticated-user-")) headers.delete(name);
  }
  headers.set("oai-authenticated-user-id", user.userId);
  headers.set("oai-authenticated-user-email", user.email);
  return new Request(request, { headers });
}
