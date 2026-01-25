import fs from "fs";
import path from "path";

// Recursively walk directories
function walk(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((file) => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Directories to index
const TARGET_DIRS = ["providers", "policies"];

// Collect all JSON files
const files = TARGET_DIRS.flatMap((dir) => walk(dir)).filter((f) => f.endsWith(".json"));

function buildEntry(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);

  return {
    id: data.id,
    type: data.type,
    version: data.version,
    path: file.replace(/\\/g, "/") // normalize for cross‑platform
  };
}

const entries = files.map(buildEntry);

const registry = {
  registry_version: "v1.0.0",
  generated_at: new Date().toISOString(),
  entries
};

fs.writeFileSync("registry.json", JSON.stringify(registry, null, 2));

console.log(`\n📦 registry.json generated with ${entries.length} entries`);
console.log("🎉 Done!");