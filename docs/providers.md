# Providers

Providers live under `providers/`:

- `providers/kyc/*`
- `providers/aml/*`
- `providers/sanctions/*`

Each file is a single JSON object conforming to `schema.json`.

To add a provider:
1. Create a JSON file in the appropriate subfolder.
2. Run `node scripts/validate.ts`.
3. Run `node scripts/generate-index.ts`.
4. Open a PR.