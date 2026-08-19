# Releasing

## Release artifact

The canonical installable artifact is:

```text
release/PersianDatePicker.pbiviz
```

## Current release flow

1. PR targets `master`.
2. CI installs dependencies.
3. Typecheck runs.
4. Date conversion tests run.
5. Production dependency audit runs.
6. `pbiviz package` produces the PBIVIZ.
7. CI uploads the PBIVIZ as a workflow artifact.
8. After code is on `master`, the workflow copies the generated package to `release/PersianDatePicker.pbiviz` and commits it.

## Versioning

The Power BI visual version in `powerbi/pbiviz.json` is the package version source. Follow semantic intent:

- patch — bugfix or documentation/build change without new user behavior;
- minor — backward-compatible feature;
- major — breaking report behavior, data contract, or installation change.

Power BI package versions use four numeric components; map semantic versions consistently and document the convention in the release PR.

## Release checklist

- [ ] CHANGELOG entry updated.
- [ ] User-facing docs updated.
- [ ] ADR added/superseded if architecture changed.
- [ ] automated gates green.
- [ ] Desktop manual acceptance complete for behavior changes.
- [ ] no new privilege without security review.
- [ ] `release/PersianDatePicker.pbiviz` updated after merge.
- [ ] direct download works.
- [ ] GitHub Pages still deploys.

## Rollback

If a release is defective, revert the product commit on `master`, let CI rebuild the PBIVIZ, and document the rollback in the changelog. Do not manually replace the release file with an untraceable binary.
