# Security Policy

## Supported version

Security fixes are applied to the latest version of the Power BI visual on `master`.

## Reporting a vulnerability

Please report vulnerabilities privately to the repository owner instead of opening a public issue with exploit details.

## Security design

The Power BI visual under `powerbi/` declares an empty `privileges` array. It does not request web access, local storage, export, or AAD authentication. Date conversion is performed locally and the visual only communicates filter state to Power BI through the supported visual host filtering API.
