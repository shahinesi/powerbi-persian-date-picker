# Repository Administration Setup

This document records the intended GitHub repository settings for maintainers. These are repository-level settings and are not encoded entirely in Git files.

## Desired steady state

### Long-lived branches

Only these two branches should remain:

```text
main           product / default branch
upstream-sync  clean upstream tracking branch
```

Temporary branches such as feature, fix, docs, release, or integration branches should be deleted after merge.

## One-time GitHub settings

### 1. Default branch

Set:

```text
Default branch = main
```

GitHub path:

```text
Repository → Settings → General → Default branch
```

Change from `master` to `main` before deleting `master`.

### 2. Remove legacy temporary branches

After `main` is the default branch, delete:

```text
master
docs-professional
powerbi-visual
```

Keep:

```text
main
upstream-sync
```

Do not delete `upstream-sync`; it is the clean parent-tracking branch.

### 3. Automatically delete merged branches

Enable GitHub's automatic deletion of pull-request head branches after merge.

This prevents feature/docs/fix branches from accumulating again.

Do not merge `upstream-sync` as a normal disposable feature branch.

### 4. GitHub Pages

Enable Pages using **GitHub Actions** as the publishing source.

Expected public site:

```text
https://shahinesi.github.io/powerbi-persian-date-picker/
```

Expected documentation page:

```text
https://shahinesi.github.io/powerbi-persian-date-picker/docs.html
```

The deployment workflow is:

```text
.github/workflows/pages.yml
```

and publishes the static `site/` directory.

### 5. Repository website/homepage

Set the repository About/Website field to:

```text
https://shahinesi.github.io/powerbi-persian-date-picker/
```

Do not leave the fork's Website field pointing at the upstream project's documentation site; upstream attribution is preserved separately through the fork relationship, NOTICE, and license documentation.

### 6. Issues

Enable GitHub Issues.

The repository already provides structured issue forms for:

- bug reports;
- feature requests;
- security redirection.

If Issues are disabled, those templates cannot serve users.

### 7. Suggested repository topics

Recommended topics:

```text
power-bi
powerbi
power-bi-custom-visual
custom-visual
persian
jalali
shamsi
date-picker
datetime
rtl
```

Topics are discovery metadata only and do not affect the fork relationship.

## Recommended main-branch protection

For a public project, consider a GitHub ruleset for `main` that:

- blocks force pushes;
- blocks deletion;
- prefers pull requests for non-trivial code changes;
- requires security/CI checks appropriate to the changed files;
- allows the release workflow to publish the generated PBIVIZ through the intended mechanism.

Do not configure a required check that never runs for documentation-only changes. The Power BI build workflow is intentionally path-scoped to `powerbi/**` and its own workflow file.

## Upstream safety

The fork relationship remains intact. Changing the default branch to `main`, enabling Pages, changing the Website field, or deleting product-only temporary branches does **not** modify the upstream repository.

Upstream synchronization is managed through `upstream-sync`; see [`UPSTREAM.md`](UPSTREAM.md).

## Verification checklist

After repository setup:

- [ ] default branch is `main`;
- [ ] branch list contains only `main` and `upstream-sync`;
- [ ] GitHub Pages is enabled and homepage loads;
- [ ] `docs.html` loads;
- [ ] repository Website points to this project's Pages site;
- [ ] Issues are enabled;
- [ ] issue forms are available;
- [ ] auto-delete merged branches is enabled;
- [ ] direct PBIVIZ download from `main/release/` works;
- [ ] upstream attribution remains visible.
