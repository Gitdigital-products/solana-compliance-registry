use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "snake_case")]
pub enum RegistryEntryType {
    KycProvider,
    AmlRuleset,
    SanctionsProvider,
    Policy,
    Audit,
    Attestation,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RegistryIndexEntry {
    pub id: String,
    #[serde(rename = "type")]
    pub entry_type: RegistryEntryType,
    pub path: String,
    pub version: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RegistryIndex {
    pub registry_version: String,
    pub generated_at: String,
    pub entries: Vec<RegistryIndexEntry>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RegistryEntry {
    pub id: String,
    #[serde(rename = "type")]
    pub entry_type: RegistryEntryType,
    pub name: String,
    pub version: String,
    pub updated_at: String,
    pub metadata: serde_json::Value,
    pub signature: Option<String>,
}