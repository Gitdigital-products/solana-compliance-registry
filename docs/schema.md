# Schema

All entries conform to `schema.json`.

Core fields:
- `id`: unique slug
- `type`: one of `kyc_provider`, `aml_ruleset`, `sanctions_provider`, `policy`, `audit`, `attestation`
- `name`: human-readable name
- `version`: semantic version
- `updated_at`: ISO 8601 timestamp
- `metadata`: type-specific object
- `signature`: optional cryptographic signature