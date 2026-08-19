# Quality Gates

A release is not considered ready merely because the code compiles. The project uses layered gates.

## Required automated gates

1. **Install succeeds** — dependency graph can be resolved.
2. **Typecheck succeeds** — Power BI/TypeScript contracts compile.
3. **Date tests succeed** — known Jalali/Gregorian mappings and UTC boundaries remain deterministic.
4. **Production audit succeeds** — no high/critical vulnerabilities in production dependencies.
5. **PBIVIZ package succeeds** — lint, capabilities schema, bundle and package generation succeed.
6. **Artifact upload succeeds** — CI proves the PBIVIZ exists.
7. **CodeQL succeeds** — JavaScript/TypeScript static security scan is green.

## Required manual gates for behavior changes

- import into Power BI Desktop;
- Date and DateTime filtering;
- clear behavior;
- bookmark restoration;
- invalid-field state;
- keyboard/RTL sanity;
- modal support/failure behavior.

## Release rule

Do not merge a behavior-changing PR while a required gate is red unless the failure is proven unrelated infrastructure noise and is rerun successfully.

## Vulnerability handling

Development-tool vulnerabilities are evaluated separately from production runtime vulnerabilities, but they are not ignored. Production audit is a hard gate; dev-only findings are tracked and upgraded when tooling compatibility permits.
