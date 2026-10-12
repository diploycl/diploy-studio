import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import "./sites-env.mjs";

const [command, ...args] = process.argv.slice(2);
const config = JSON.parse(readFileSync(new URL("../wrangler.json", import.meta.url), "utf8"));
function run(cli, argv) {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(cli, import.meta.url)), ...argv], {
    stdio: "inherit", env: { ...process.env, DIPLOY_TARGET: "cloudflare" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
function requireProductionConfig() {
  if (config.d1_databases[0].database_id === "00000000-0000-4000-8000-000000000000" ||
      Object.values(config.vars).some(value => String(value).includes("REEMPLAZAR"))) {
    throw new Error("Completa database_id, ACCESS_TEAM_DOMAIN y ACCESS_AUD en wrangler.json. Consulta CLOUDFLARE.md.");
  }
  if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(config.vars.ACCESS_TEAM_DOMAIN)) {
    throw new Error("ACCESS_TEAM_DOMAIN debe ser https://tu-equipo.cloudflareaccess.com, sin barra final.");
  }
}
const wrangler = "../node_modules/wrangler/bin/wrangler.js";
if (command === "build") {
  run("../node_modules/vite/bin/vite.js", ["build", ...args]);
} else if (command === "deploy") {
  requireProductionConfig();
  run("../node_modules/vite/bin/vite.js", ["build"]);
  run(wrangler, ["d1", "migrations", "apply", "DB", "--remote", "--config", "wrangler.json"]);
  run(wrangler, ["deploy", "--config", "dist/server/wrangler.json", ...args]);
} else if (command === "migrate") {
  requireProductionConfig();
  run(wrangler, ["d1", "migrations", "apply", "DB", "--remote", "--config", "wrangler.json", ...args]);
} else if (command === "check") {
  run("../node_modules/vite/bin/vite.js", ["build"]);
  run(wrangler, ["deploy", "--dry-run", "--config", "dist/server/wrangler.json"]);
} else {
  throw new Error("Expected build, deploy, migrate or check.");
}
