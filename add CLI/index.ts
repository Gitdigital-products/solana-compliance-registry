#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";

program
  .name("scr")
  .description("Solana Compliance Registry CLI")
  .version("1.0.0");

program
  .command("list")
  .description("List all registry entries")
  .action(() => {
    const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"));
    registry.entries.forEach((e: any) => {
      console.log(`${e.id} (${e.type}) - ${e.version}`);
    });
  });

program
  .command("get")
  .argument("<id>", "entry id")
  .description("Get a specific registry entry")
  .action(id => {
    const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"));
    const entry = registry.entries.find((e: any) => e.id === id);
    if (!entry) {
      console.error("Not found");
      process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(entry.path, "utf8"));
    console.log(JSON.stringify(data, null, 2));
  });

program.parse();