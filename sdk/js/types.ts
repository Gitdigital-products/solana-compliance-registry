export type RegistryEntryType =
  | "kyc_provider"
  | "aml_ruleset"
  | "sanctions_provider"
  | "policy"
  | "audit"
  | "attestation";

export interface RegistryEntry {
  id: string;
  type: RegistryEntryType;
  name: string;
  version: string;
  updated_at: string;
  metadata: Record<string, unknown>;
  signature?: string;
}

export interface RegistryIndexEntry {
  id: string;
  type: RegistryEntryType;
  path: string;
  version: string;
}

export interface RegistryIndex {
  registry_version: string;
  generated_at: string;
  entries: RegistryIndexEntry[];
}