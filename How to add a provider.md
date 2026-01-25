---

# 🧙 HOW TO ADD A PROVIDER (wizard page)
Create a page named: How to Add a Provider

```md

How to Add a Provider
This wizard walks you through adding a new KYC, AML, or Sanctions provider to the Solana Compliance Registry.

The process takes 2–3 minutes and ensures your provider entry is:

- Validated against schema.json
- Indexed in registry.json
- Ready for SDK consumption
- Ready for PR submission

---

🧩 Step 1 — Choose Provider Type

Select one:

- KYC Provider → providers/kyc/
- AML Rule Set → providers/aml/
- Sanctions Provider → providers/sanctions/

Create a new file:

`
providers/<type>/<provider-id>.json
`

Example:

`
providers/kyc/myprovider-kyc.json
`

---

🧩 Step 2 — Create the Provider File

Use this template:

`json
{
  "id": "myprovider-kyc",
  "type": "kyc_provider",
  "name": "MyProvider KYC",
  "version": "v1.0.0",
  "updated_at": "2026-01-25T00:00:00Z",
  "metadata": {
    "website": "https://example.com",
    "jurisdictions_supported": ["US", "EU"],
    "verification_methods": ["document", "liveness"],
    "solana_integration": false
  }
}
`

Rules
- id must be lowercase, hyphenated  
- version must follow semantic versioning  
- updated_at must be ISO 8601  

---

🧩 Step 3 — Validate the Provider

Run:

`bash
node scripts/validate.ts
`

If valid, you’ll see:

`
✅ Valid: providers/kyc/myprovider-kyc.json
`

If not, errors will be printed with exact field paths.

---

🧩 Step 4 — Regenerate the Registry Index

`bash
node scripts/generate-index.ts
`

This updates registry.json with your new provider.

---

🧩 Step 5 — Submit a Pull Request

Include:

- Provider description  
- Website link  
- Supported jurisdictions  
- Verification methods  
- Any compliance certifications
```
