---
name: push
description: Stage all changes, commit with a descriptive message, and push to remote
disable-model-invocation: true
allowed-tools: Bash(git *)
---

Push current changes to the remote repository. Follow these steps exactly:

1. Run `git status` to see what changed
2. Run `git diff --stat` to understand the scope of changes
3. Run `git log --oneline -3` to match the existing commit message style
4. Stage all modified and untracked files (but skip .env files, credentials, or secrets)
5. Write a concise commit message that describes what changed and why
6. If the user provided a message in $ARGUMENTS, use that as the commit message instead
7. Commit with the message, appending: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
8. Push to the remote

Use a HEREDOC for the commit message to preserve formatting:
```
git commit -m "$(cat <<'EOF'
commit message here

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```
