import fs from "fs";
import path from "path";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });
const schema = JSON.parse(fs.readFileSync("schema.json", "utf8"));
const validate = ajv.compile(schema);

function walk(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const full = path.join(dir, file);
    return fs.statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk("providers").concat(walk("policies"));

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const valid = validate(data);
  if (!valid) {
    console.error(`❌ Invalid: ${file}`);
    console.error(validate.errors);
    process.exit(1);
  }
}

console.log("✅ All registry entries are valid");