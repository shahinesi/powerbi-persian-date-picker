# Upstream Synchronization Strategy

## Goal

Keep this repository recognizable as its own Power BI product while preserving a clean relationship with the upstream React date-picker project.

## Intended branch structure

Only two long-lived branches are required:

```text
main           product/default branch
upstream-sync  clean upstream tracking branch
```

`main` contains the Power BI layer, documentation, site, CI, release artifacts, and any product-specific integration.

`upstream-sync` tracks:

```text
https://github.com/shahabyazdi/react-multi-date-picker
```

and should not contain product-only commits.

## Why not synchronize upstream directly into main?

The GitHub **Sync fork** button is optimized for a fork whose default branch is intended to mirror the upstream default branch. This repository has evolved into a product with additional files and behavior.

Using `upstream-sync` gives maintainers a controlled review point:

```text
upstream/master
      ↓
upstream-sync
      ↓ review / tests / conflict resolution
main
```

## Updating upstream-sync locally

```bash
git remote add upstream https://github.com/shahabyazdi/react-multi-date-picker.git
git fetch upstream
git switch upstream-sync
git reset --hard upstream/master
git push origin upstream-sync --force-with-lease
```

The force is intentional only for `upstream-sync`, because that branch is a tracking mirror.

## Integrating an upstream change into main

Do not blindly merge every upstream commit if it is irrelevant to the Power BI product.

Recommended workflow:

1. refresh `upstream-sync`;
2. compare `upstream-sync` with the upstream-derived files on `main`;
3. identify useful/security/compatibility changes;
4. create a temporary integration branch locally if needed;
5. resolve conflicts deliberately;
6. run Power BI quality gates;
7. merge the reviewed result into `main`;
8. remove the temporary integration branch.

## Quality gates after upstream integration

```bash
cd powerbi
npm install
npm run typecheck
npm test
npm run audit:prod
npm run package
```

CodeQL must also pass.

## Long-lived branch policy

Do not keep feature, documentation or release branches after their work is merged.

The intended steady state is:

```text
main
upstream-sync
```

Temporary branches are acceptable only during active work and should be deleted after merge.
