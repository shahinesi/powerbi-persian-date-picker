# Development Guide

## Repository model

The upstream library source is at repository root. The Power BI custom visual is an isolated project under `powerbi/`.

For normal product development:

```bash
cd powerbi
npm install
```

## Commands

```bash
npm run typecheck   # TypeScript compile check
npm test            # deterministic date conversion tests
npm run audit:prod  # production dependency vulnerability gate
npm run package     # lint + Power BI capability validation + PBIVIZ package
npm run verify      # combined local verification
```

`npm run start` can be used with Power BI's local custom visual developer flow when the host environment is configured for developer visuals.

## Engineering boundaries

Prefer:

- `powerbi/src/visual.ts` for host/filter lifecycle;
- `powerbi/src/DatePickerDialog.tsx` for dialog UI;
- `powerbi/src/dateUtils.ts` for date conversion;
- `powerbi/style/` for product styling;
- `powerbi/capabilities.json` for Power BI roles/capabilities.

Avoid editing root upstream-derived source for Power BI-only behavior.

## Adding a feature

1. Define user-visible behavior.
2. Identify whether it changes the filter contract.
3. Check Power BI host/API compatibility.
4. Review timezone/date semantics.
5. Review privilege/security impact.
6. Add tests for deterministic transformations.
7. Package locally.
8. Update docs.
9. Add an ADR if the architecture changes.

## Dependency policy

Runtime dependencies should be minimal and justified. Avoid adding dependencies for simple utilities. A dependency that introduces network behavior or requires Power BI privileges needs explicit design and security review.

## Generated files

Do not manually edit build output under `powerbi/dist/`. CI packages and publishes the canonical PBIVIZ artifact after changes reach `master`.
