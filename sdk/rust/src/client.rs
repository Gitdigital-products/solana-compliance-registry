use crate::{RegistryEntry, RegistryIndex, RegistryIndexEntry};
use serde_json::from_slice;
use tokio::fs;

pub struct ComplianceRegistryClient {
    index: RegistryIndex,
}

impl ComplianceRegistryClient {
    pub async fn new(registry_path: &str) -> anyhow::Result<Self> {
        let bytes = fs::read(registry_path).await?;
        let index: RegistryIndex = from_slice(&bytes)?;
        Ok(Self { index })
    }

    pub fn list_entries(&self) -> &Vec<RegistryIndexEntry> {
        &self.index.entries
    }

    pub fn list_by_type(&self, t: &str) -> Vec<&RegistryIndexEntry> {
        self.index
            .entries
            .iter()
            .filter(|e| format!("{:?}", e.entry_type).to_lowercase() == t)
            .collect()
    }

    pub async fn get_entry(&self, id: &str) -> anyhow::Result<Option<RegistryEntry>> {
        if let Some(meta) = self.index.entries.iter().find(|e| e.id == id) {
            let bytes = fs::read(&meta.path).await?;
            let entry: RegistryEntry = from_slice(&bytes)?;
            Ok(Some(entry))
        } else {
            Ok(None)
        }
    }
}