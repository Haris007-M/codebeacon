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

Git is part of every developer's daily work, so interviewers use it to check whether you have worked on a real team. They are less interested in command names than in whether you understand what each command does to history and when it is safe to use. The answers below start with a short statement you can say out loud, then explain the detail behind it.

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

## What are the working directory, the staging area and the repository?

Git has three places where your changes live. The **working directory** holds the files you edit. The **staging area** (also called the index) holds the changes you have marked for the next commit with `git add`. The **repository** stores the commits you have made. Staging lets you build a commit from only some of your changes instead of everything you touched.

## What is the difference between git fetch and git pull?

`git fetch` downloads new commits from the remote and updates your remote-tracking branches, but it does not change your working files. `git pull` is a fetch followed by a merge, or by a rebase if you use `git pull --rebase`. Fetching first is a safe way to see what changed before you integrate it.

## What are the git reset modes?

- `--soft` moves the branch pointer and keeps your changes **staged**.
- `--mixed` (the default) moves the pointer and keeps your changes in the working directory, **unstaged**.
- `--hard` moves the pointer and **discards** the changes completely.

Say that `--hard` is the dangerous one, and that `git reflog` is how you recover from using it by mistake.

## What is HEAD, and what is a detached HEAD?

`HEAD` points to the commit you currently have checked out, normally through a branch name. A detached HEAD means you checked out a specific commit, tag or remote branch instead of a local branch. You can look around and even commit, but those commits belong to no branch and can be lost. If you want to keep the work, create a branch with `git switch -c my-branch`.

## How do you stop tracking a file but keep it on disk?

Use `git rm --cached file.env` and add the path to `.gitignore`. If the file contained a secret such as an API key, treat the secret as exposed: rotate it, because removing the file from the latest commit does not remove it from history.

## What is git bisect?

It finds the commit that introduced a bug using a binary search. You mark one commit as bad and an older one as good, and Git checks out the middle commit for you to test:

```bash
git bisect start
git bisect bad              # the current commit is broken
git bisect good v1.4.0      # this older tag worked
# test the checked-out commit, then run: git bisect good  (or: git bisect bad)
git bisect reset            # finish and return to your branch
```

With hundreds of commits in between, it takes only a handful of steps.

## What makes a good commit message?

A short summary line in the imperative mood ("Add login form", not "Added login form"), kept to about 50 characters, followed by a blank line and a body that explains **why** the change was made. The diff already shows what changed, so the message should explain the reason. Small, focused commits also make `revert` and `bisect` much easier to use.

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

## When should you use merge and when rebase?

A common team rule is to rebase your own local feature branch onto the latest `main` to keep your history clean, and to merge the finished branch through a pull request. The one hard rule is never to rebase commits that other people have already pulled, because it rewrites history and forces them to repair their branches.
