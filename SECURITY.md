# Security Policy

## Supported versions

Security fixes are applied to the latest code on `master` and to the latest published `release/PersianDatePicker.pbiviz` artifact. Older packaged visuals are not maintained as separate security branches unless explicitly announced.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public issue, discussion, or pull request.

Preferred process:

1. Use GitHub's private vulnerability reporting / Security Advisory feature for this repository when available.
2. Include a concise description, affected component, reproduction steps, impact, and suggested mitigation if known.
3. Avoid including real customer data, tenant identifiers, access tokens, report exports, or confidential datasets.

If private vulnerability reporting is unavailable, contact the repository maintainer through the contact information on the GitHub profile and clearly mark the message as a security report.

## Security posture

The Power BI visual is intentionally designed with a small privilege surface:

- no external web access;
- no AAD authentication privilege;
- no local storage privilege;
- no export privilege;
- no arbitrary HTML injection;
- no dynamic code execution;
- no customer data transmission by the visual.

The primary security-relevant operation is applying a native Power BI JSON filter to the field bound by the report author.

## Automated checks

The repository runs:

- TypeScript compilation;
- production dependency audit;
- Power BI packaging/lint validation;
- CodeQL JavaScript/TypeScript analysis;
- deterministic date conversion tests.

See [`docs/THREAT-MODEL.md`](docs/THREAT-MODEL.md) and [`docs/QUALITY-GATES.md`](docs/QUALITY-GATES.md).

## Disclosure

Please allow a reasonable remediation window before public disclosure. Valid reports will be investigated, fixed where appropriate, and documented in release notes without exposing sensitive exploitation details.
