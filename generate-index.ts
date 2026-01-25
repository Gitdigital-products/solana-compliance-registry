import fs from "fs";
import path from "path";

function walk(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function buildEntry(file) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    id: data.id,
    type: data.type,
    path: file.replace(/\\/g, "/"),
    version: data.version
  };
}

const providerFiles = walk("providers");
const policyFiles = walk("policies");

const entries = [...providerFiles, ...policyFiles].map(buildEntry);

const registry = {
  registry_version: "v1.0.0",
  generated_at: new Date().toISOString(),
  entries
};

fs.writeFileSync("registry.json", JSON.stringify(registry, null, 2));
console.log("✅ registry.json generated");