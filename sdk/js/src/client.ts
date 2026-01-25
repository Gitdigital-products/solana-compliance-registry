import fs from "fs";
import path from "path";
import { RegistryEntry, RegistryIndex } from "./types";

export class ComplianceRegistryClient {
  private index: RegistryIndex;

  constructor(registryPath = "registry.json") {
    const raw = fs.readFileSync(registryPath, "utf8");
    this.index = JSON.parse(raw);
  }

  listEntries() {
    return this.index.entries;
  }

  listByType(type: RegistryEntry["type"]) {
    return this.index.entries.filter(e => e.type === type);
  }

  getEntry(id: string): RegistryEntry | null {
    const entryMeta = this.index.entries.find(e => e.id === id);
    if (!entryMeta) return null;
    const raw = fs.readFileSync(entryMeta.path, "utf8");
    return JSON.parse(raw);
  }

  listProviders() {
    return this.index.entries.filter(e =>
      ["kyc_provider", "aml_ruleset", "sanctions_provider"].includes(e.type)
    );
  }

  listPolicies() {
    return this.index.entries.filter(e => e.type === "policy");
  }
}