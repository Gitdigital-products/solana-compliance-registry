from solana_compliance_registry import ComplianceRegistryClient

client = ComplianceRegistryClient()
providers = client.list_providers()