---
title: "Advanced Git Tips and Tricks"
description: "Improve your Git skills with these advanced tips and best practices."
date: "2024-02-10"
slug: "advanced-git-tips"
image: "https://picsum.photos/400/300?random=6"
tags: ["Git", "Version Control", "Development", "Tools"]
category: "Tutorial"
author: "Developer"
---

# Advanced Git Tips and Tricks

Git is an incredibly powerful version control system, but many developers only scratch the surface of its capabilities. This comprehensive guide will take you beyond the basics and introduce you to advanced Git techniques that will make you more productive and help you handle complex scenarios with confidence.

## Interactive Rebase

Interactive rebase is one of Git's most powerful features for cleaning up your commit history before sharing it with others.

### Basic Interactive Rebase

```bash
# Rebase the last 3 commits interactively
git rebase -i HEAD~3

# Rebase everything since branching from main
git rebase -i main
```

### Rebase Commands

When you run interactive rebase, you'll see an editor with options:

```
pick abc1234 Add user authentication
pick def5678 Fix typo in login form
pick ghi9012 Update user documentation

# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# d, drop = remove commit
```

### Common Rebase Scenarios

**Squashing commits:**
```
pick abc1234 Add user authentication
squash def5678 Fix typo in login form
squash ghi9012 Update user documentation
```

**Reordering commits:**
```
pick ghi9012 Update user documentation
pick abc1234 Add user authentication
pick def5678 Fix typo in login form
```

**Editing commits:**
```
edit abc1234 Add user authentication
pick def5678 Fix typo in login form
pick ghi9012 Update user documentation
```

### Advanced Rebase with --autosquash

Use `--fixup` and `--squash` commits for automatic cleanup:

```bash
# Create a fixup commit
git commit --fixup abc1234

# Create a squash commit
git commit --squash abc1234

# Auto-squash during rebase
git rebase -i --autosquash HEAD~10
```

## Cherry-Picking

Cherry-picking allows you to apply specific commits from one branch to another.

### Basic Cherry-Pick

```bash
# Apply a single commit
git cherry-pick abc1234

# Apply multiple commits
git cherry-pick abc1234 def5678 ghi9012

# Apply a range of commits
git cherry-pick abc1234..ghi9012
```

### Cherry-Pick with Merge Commits

```bash
# Cherry-pick a merge commit (specify mainline)
git cherry-pick -m 1 abc1234
```

### Cherry-Pick without Committing

```bash
# Apply changes without creating a commit
git cherry-pick --no-commit abc1234

# Edit the commit message
git cherry-pick --edit abc1234
```

## Advanced Branching Strategies

### Git Flow

A robust branching model for larger projects:

```bash
# Initialize git flow
git flow init

# Start a new feature
git flow feature start my-feature

# Finish a feature
git flow feature finish my-feature

# Start a release
git flow release start 1.0.0

# Finish a release
git flow release finish 1.0.0
```

### GitHub Flow

A simpler flow for continuous deployment:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push and create pull request
git push origin feature/new-feature
```

## Git Hooks

Automate tasks with Git hooks - scripts that run at specific Git events.

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run tests before commit
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Commit aborted."
    exit 1
fi

# Check for debug statements
if grep -r "console.log\|debugger" src/; then
    echo "Debug statements found. Please remove them before committing."
    exit 1
fi
```

### Commit Message Hook

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Ensure commit message follows conventional commits
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    echo "Format: type(scope): description"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi
```

### Pre-push Hook

```bash
#!/bin/sh
# .git/hooks/pre-push

# Prevent pushing to main branch
protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]; then
    echo "Direct push to main branch is not allowed"
    exit 1
fi
```

## Advanced Git Commands

### Bisect - Find Bugs

Use binary search to find the commit that introduced a bug:

```bash
# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good abc1234

# Git will checkout a commit in the middle
# Test and mark as good or bad
git bisect good  # or git bisect bad

# Continue until bug is found
# Reset when done
git bisect reset
```

### Automated Bisect

```bash
# Use a script to automate testing
git bisect start HEAD abc1234
git bisect run npm test
```

### Reflog - Recover Lost Commits

The reflog keeps track of all Git operations:

```bash
# View reflog
git reflog

# Restore a lost commit
git checkout abc1234

# Create a branch from lost commit
git branch recovered-work abc1234
```

### Worktrees - Multiple Working Directories

Work on multiple branches simultaneously:

```bash
# Create a new worktree
git worktree add ../feature-branch feature-branch

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../feature-branch
```

## Advanced Merging Techniques

### Merge Strategies

```bash
# Recursive merge (default)
git merge feature-branch

# Octopus merge (multiple branches)
git merge branch1 branch2 branch3

# Ours strategy (ignore changes from other branch)
git merge -s ours feature-branch

# Subtree merge
git merge -s subtree feature-branch
```

### Merge with Custom Strategy

```bash
# Resolve conflicts always favoring "ours"
git merge -X ours feature-branch

# Resolve conflicts always favoring "theirs"
git merge -X theirs feature-branch

# Ignore whitespace changes
git merge -X ignore-space-change feature-branch
```

## Stashing Advanced Techniques

### Selective Stashing

```bash
# Stash only specific files
git stash push -m "Work in progress" file1.js file2.css

# Stash with untracked files
git stash -u

# Stash everything including ignored files
git stash -a

# Interactive stashing
git stash -p
```

### Stash Management

```bash
# List stashes with more detail
git stash list --stat

# Show stash contents
git stash show -p stash@{0}

# Apply specific stash
git stash apply stash@{2}

# Create branch from stash
git stash branch new-feature stash@{0}
```

## Git Aliases for Productivity

Add these to your `~/.gitconfig`:

```ini
[alias]
    # Better log
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    
    # Show all branches
    ba = branch -a
    
    # Quick status
    st = status -s
    
    # Quick diff
    df = diff --color-words
    
    # Undo last commit but keep changes
    undo = reset HEAD~1
    
    # Interactive rebase
    rb = rebase -i
    
    # Find commits by message
    find = "!f() { git log --all --grep=\"$1\" --oneline; }; f"
    
    # Show who changed what in a file
    blame-stats = "!f() { git log --follow -p -- \"$1\" | grep '^+' | sort | uniq -c | sort -rn; }; f"
    
    # Clean up merged branches
    cleanup = "!f() { git branch --merged | grep -v '\\*\\|main\\|master' | xargs -n 1 git branch -d; }; f"
    
    # Quick commit
    cm = commit -m
    
    # Amend last commit
    amend = commit --amend --no-edit
    
    # Force push safely
    pushf = push --force-with-lease
```

## Searching and Finding

### Advanced Git Grep

```bash
# Search for text in all files
git grep "function"

# Search in specific file types
git grep "TODO" -- "*.js"

# Search with line numbers
git grep -n "console.log"

# Search and show context
git grep -C 3 "error"

# Search for regex patterns
git grep -E "function|class"
```

### Git Log Searching

```bash
# Search commit messages
git log --grep="bug fix"

# Search by author
git log --author="John Doe"

# Search by date range
git log --since="2023-01-01" --until="2023-12-31"

# Search for code changes
git log -S "functionName"

# Search for code changes (regex)
git log -G "pattern"

# Show commits that touched a file
git log --follow -- filename.js
```

## Performance and Maintenance

### Repository Maintenance

```bash
# Clean up unnecessary files
git gc --aggressive --prune=now

# Verify repository integrity
git fsck --full

# Show repository size
git count-objects -vH

# Repack repository
git repack -Ad

# Clean up remote tracking branches
git remote prune origin
```

### Large File Handling

```bash
# Track large files with Git LFS
git lfs track "*.psd"
git lfs track "*.zip"

# Show LFS files
git lfs ls-files

# Migrate existing files to LFS
git lfs migrate import --include="*.zip"
```

## Collaboration Best Practices

### Code Review Workflow

```bash
# Create feature branch
git checkout -b feature/user-auth

# Make commits with descriptive messages
git commit -m "feat(auth): add user registration endpoint"
git commit -m "test(auth): add unit tests for registration"
git commit -m "docs(auth): update API documentation"

# Push and create pull request
git push origin feature/user-auth

# After review, squash commits
git rebase -i HEAD~3

# Force push (safely)
git push --force-with-lease origin feature/user-auth
```

### Conventional Commits

Use conventional commit format for better changelog generation:

```bash
git commit -m "feat(user): add password reset functionality"
git commit -m "fix(api): handle null response in user service"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(css): format user profile styles"
git commit -m "refactor(auth): extract validation logic"
git commit -m "test(user): add integration tests"
git commit -m "chore(deps): update dependencies"
```

## Troubleshooting Common Issues

### Resolving Merge Conflicts

```bash
# Use a merge tool
git mergetool

# Manually resolve conflicts, then:
git add conflicted-file.js
git commit

# Abort merge if needed
git merge --abort
```

### Fixing Mistakes

```bash
# Change last commit message
git commit --amend -m "New message"

# Add files to last commit
git add forgotten-file.js
git commit --amend --no-edit

# Reset to previous commit (destructive)
git reset --hard HEAD~1

# Reset to previous commit (keep changes)
git reset --soft HEAD~1

# Revert a commit (safe)
git revert abc1234
```

### Recovering from Disasters

```bash
# Restore deleted branch
git reflog
git checkout -b recovered-branch abc1234

# Restore deleted file
git checkout HEAD~1 -- deleted-file.js

# Undo force push (if reflog available)
git reset --hard ORIG_HEAD
git push --force-with-lease
```

## Git Configuration Optimization

### Global Configuration

```bash
# Better default behavior
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global rebase.autoStash true
git config --global rerere.enabled true

# Better diff and merge tools
git config --global diff.tool vimdiff
git config --global merge.tool vimdiff

# Signing commits
git config --global user.signingkey YOUR_GPG_KEY_ID
git config --global commit.gpgsign true

# Credential helper
git config --global credential.helper store
```

### Repository-specific Configuration

```bash
# Different email for work projects
git config user.email "work@company.com"

# Different signing key
git config user.signingkey WORK_GPG_KEY_ID
```

## Automation and Scripts

### Git Hooks with Husky

```bash
npm install --save-dev husky

# Add to package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### Custom Git Commands

Create executable scripts in your PATH:

```bash
#!/bin/bash
# git-feature (create feature branch)
git checkout main
git pull origin main
git checkout -b feature/$1
```

```bash
#!/bin/bash
# git-cleanup (clean merged branches)
git branch --merged | grep -v "\*\|main\|master" | xargs -n 1 git branch -d
git remote prune origin
```

## Conclusion

These advanced Git techniques will significantly improve your development workflow:

1. **Interactive rebase** for clean commit history
2. **Cherry-picking** for selective change application
3. **Git hooks** for automation and quality control
4. **Bisect** for efficient bug hunting
5. **Reflog** for disaster recovery
6. **Aliases** for improved productivity
7. **Advanced searching** for finding specific changes
8. **Proper branching strategies** for team collaboration

Remember:
- Practice these techniques in a safe environment first
- Always backup important work before experimenting
- Use `git reflog` when things go wrong
- Communicate with your team about workflows and conventions

Mastering these advanced Git techniques will make you a more efficient developer and help you handle complex version control scenarios with confidence! 🚀 