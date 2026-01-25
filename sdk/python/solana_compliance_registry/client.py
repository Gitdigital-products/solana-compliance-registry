import json
from dataclasses import dataclass
from typing import List, Optional, Dict, Any


@dataclass
class RegistryIndexEntry:
    id: str
    type: str
    path: str
    version: str


@dataclass
class RegistryIndex:
    registry_version: str
    generated_at: str
    entries: List[RegistryIndexEntry]


class ComplianceRegistryClient:
    def __init__(self, registry_path: str = "registry.json"):
        with open(registry_path, "r") as f:
            data = json.load(f)
        self.index = RegistryIndex(
            registry_version=data["registry_version"],
            generated_at=data["generated_at"],
            entries=[
                RegistryIndexEntry(**e) for e in data["entries"]
            ],
        )

    def list_entries(self) -> List[RegistryIndexEntry]:
        return self.index.entries

    def list_by_type(self, type_: str) -> List[RegistryIndexEntry]:
        return [e for e in self.index.entries if e.type == type_]

    def get_entry(self, id_: str) -> Optional[Dict[str, Any]]:
        meta = next((e for e in self.index.entries if e.id == id_), None)
        if not meta:
            return None
        with open(meta.path, "r") as f:
            return json.load(f)

    def list_providers(self) -> List[RegistryIndexEntry]:
        provider_types = {"kyc_provider", "aml_ruleset", "sanctions_provider"}
        return [e for e in self.index.entries if e.type in provider_types]

    def list_policies(self) -> List[RegistryIndexEntry]:
        return [e for e in self.index.entries if e.type == "policy"]