# Upstream and Fork Strategy

## Objective

Make this fork look and behave like the **Persian Date Picker for Power BI** product by default while preserving a clean, auditable relationship with `shahabyazdi/react-multi-date-picker`.

## Branch policy

### `master` — product/default branch

This is the user-facing branch. It contains:

- Power BI integration;
- project README/docs;
- CI/release automation;
- GitHub Pages site;
- upstream source plus deliberate upstream updates.

GitHub currently uses `master` as this repository's default branch, so the repository landing page displays the product README.

### `upstream-sync` — upstream tracking branch

This branch is reserved for tracking the upstream repository's `master` without product-specific commits.

At the time this strategy was established, upstream `master` was:

```text
ad739ff1a5e3a3da42abb6a0c611533a4c327f73
```

and `upstream-sync` was created at that exact commit.

## Safe sync workflow

Using Git locally:

```bash
git remote add upstream https://github.com/shahabyazdi/react-multi-date-picker.git
git fetch upstream

git checkout upstream-sync
git reset --hard upstream/master
git push --force-with-lease origin upstream-sync

git checkout -b chore/integrate-upstream master
git merge upstream-sync
# resolve only intentional conflicts, then run all product gates
git push origin chore/integrate-upstream
```

Open a PR from `chore/integrate-upstream` to `master` and validate the Power BI product before merging.

## Why not blindly press “Sync fork” on `master`?

GitHub can sync a fork branch from upstream, but when the product branch has unique commits, conflicts may need resolution. Our README, workflows, and product layer intentionally diverge. Using `upstream-sync` makes upstream review explicit and prevents an upstream sync from accidentally becoming a product release.

Official GitHub reference: https://docs.github.com/pull-requests/how-tos/work-with-forks/syncing-a-fork

## Fork banner

GitHub will continue to show that this repository is forked from the upstream project. That is desirable: it preserves attribution and the fork network.

If the goal were to remove the fork relationship entirely, the repository would have to be detached/duplicated as an independent repository. That would sacrifice the normal fork relationship and is **not** recommended for this project.

## Conflict policy

When upstream changes overlap product documentation or integration:

1. preserve upstream license/attribution;
2. preserve product behavior on `master`;
3. prefer moving Power BI changes back under `powerbi/` rather than permanently patching upstream files;
4. document non-trivial choices in an ADR.
