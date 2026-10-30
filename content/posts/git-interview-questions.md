---
title: "Git interview questions every frontend developer should know"
description: "Merge vs rebase, resetting, stashing and fixing mistakes: the Git answers that show real experience."
date: "2026-10-18"
category: "Git"
readTime: "5 min read"
links:
  - "Pro Git book (free)|https://git-scm.com/book/en/v2"
  - "Git reference|https://git-scm.com/docs"
  - "Merging vs rebasing (Atlassian)|https://www.atlassian.com/git/tutorials/merging-vs-rebasing"
---

## What is the difference between merge and rebase?

`merge` joins two branches with a merge commit and preserves history. `rebase` replays your commits on top of another branch for a linear history. Never rebase commits that others have already pulled.

## What is the difference between reset and revert?

`git reset` moves the branch pointer and rewrites history. `git revert` creates a new commit that undoes a previous one, so it is safe on shared branches.

## How do you undo your last commit but keep the changes?

```bash
git reset --soft HEAD~1
```

## What does git stash do?

It shelves uncommitted changes so you can switch branches, and `git stash pop` brings them back.

## How do you resolve a merge conflict?

Open the conflicted files, choose the correct code between the markers, `git add` the files, then continue the merge or rebase.

## What is git cherry-pick?

It applies a single commit from another branch onto your current branch.

## A normal feature workflow

```bash
git switch -c feature/login        # new branch
git add .
git commit -m "Add login form"
git fetch origin
git rebase origin/main             # replay your work on the latest main
git push -u origin feature/login   # then open a pull request
```

## Clean up commits before a pull request

```bash
git rebase -i HEAD~3   # mark commits as squash or reword
```

## Recover from mistakes

```bash
git restore file.ts          # discard local changes to a file
git reflog                   # find a "lost" commit
git reset --hard <commit>    # return to it (careful: discards changes)
```

**Interview tip:** explain `reflog`. It shows you know that Git rarely loses committed work.
