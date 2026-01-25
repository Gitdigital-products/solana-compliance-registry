import fs from "fs";
import path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Load schema
const schema = JSON.parse(fs.readFileSync("schema.json", "utf8"));
const validate = ajv.compile(schema);

// Recursively walk directories
function walk(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((file) => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Directories to validate
const TARGET_DIRS = ["providers", "policies"];

// Collect all JSON files
const files = TARGET_DIRS.flatMap((dir) => walk(dir)).filter((f) => f.endsWith(".json"));

let hasErrors = false;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);

  const valid = validate(data);

  if (!valid) {
    hasErrors = true;
    console.error(`\n❌ Invalid entry: ${file}`);
    console.error(validate.errors);
  } else {
    console.log(`✅ Valid: ${file}`);
  }
}

if (hasErrors) {
  console.error("\n❌ Validation failed. Fix errors above.");
  process.exit(1);
}

console.log("\n🎉 All registry entries are valid!");