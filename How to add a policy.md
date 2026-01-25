# 🧙 HOW TO ADD A POLICY (wizard page)
Create a page named: How to Add a Policy

`md

How to Add a Policy
This wizard guides you through creating a new compliance or governance policy for the Solana Compliance Registry.

Policies define reusable compliance configurations for:

- dApps  
- DAOs  
- Token launches  
- NFT marketplaces  
- DeFi protocols  

---

🧩 Step 1 — Choose Policy Type

Select one:

- Compliance Policy → policies/compliance/
- Governance Policy → policies/governance/

Create a file:

`
policies/<type>/<policy-id>.json
`

Example:

`
policies/compliance/my-kyc-policy.json
`

---

🧩 Step 2 — Create the Policy File

Use this template:

`json
{
  "id": "my-kyc-policy",
  "type": "policy",
  "name": "My KYC Policy",
  "version": "v1.0.0",
  "updated_at": "2026-01-25T00:00:00Z",
  "metadata": {
    "description": "Custom KYC policy",
    "minimum_age": 18,
    "required_checks": ["identity", "liveness"],
    "accepted_providers": ["civic-kyc", "fractal-kyc"]
  }
}
`

Rules
- id must be lowercase, hyphenated  
- metadata must reference valid provider IDs  
- version must follow semantic versioning  

---

🧩 Step 3 — Validate the Policy

`bash
node scripts/validate.ts
`

---

🧩 Step 4 — Regenerate the Registry Index

`bash
node scripts/generate-index.ts
`

---

🧩 Step 5 — Submit a Pull Request

Include:

- Policy purpose  
- Provider dependencies  
- Risk level  
- Intended use cases  
