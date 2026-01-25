#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";

program
  .command("list")
  .description("List all registry entries")
  .action(() => {
    const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"));
    registry.entries.forEach(e => {
      console.log(`${e.id} (${e.type}) - ${e.version}`);
    });
  });

program
  .command("get <id>")
  .description("Get a specific registry entry")
  .action(id => {
    const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"));
    const entry = registry.entries.find(e => e.id === id);
    console.log(entry || "Not found");
  });

program.parse();