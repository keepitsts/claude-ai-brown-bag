# AI Docs

Documentation fetched locally for AI agent reference. These files are committed to the repo so agents can read them without network access.

## Updating

```bash
python tools/ai-docs/fetch_claude_code_docs.py
```

This fetches `llms.txt` from `https://code.claude.com/docs/llms.txt`, extracts all linked `.md` URLs, and downloads them to `ai-docs/claude-code/`.

## Claude Code (`ai-docs/claude-code/`)

75 files sourced from [code.claude.com/docs](https://code.claude.com/docs/llms.txt). Last updated: 2026-04-02.

### Getting Started
- `overview.md` — what Claude Code is
- `quickstart.md` — CLI quickstart
- `desktop-quickstart.md` — desktop app quickstart
- `setup.md` — installation and setup
- `features-overview.md` — feature summary

### Core Usage
- `interactive-mode.md` — interactive CLI mode
- `cli-reference.md` — full CLI flags and options
- `commands.md` — slash commands reference
- `common-workflows.md` — common task patterns
- `best-practices.md` — tips for effective use
- `fast-mode.md` — fast output mode
- `fullscreen.md` — fullscreen mode
- `output-styles.md` — output formatting
- `keybindings.md` — keyboard shortcuts
- `statusline.md` — status line configuration
- `terminal-config.md` — terminal setup
- `voice-dictation.md` — voice dictation input
- `context-window.md` — context window management

### Configuration & Settings
- `settings.md` — settings overview
- `model-config.md` — model selection and config
- `permissions.md` — permission modes
- `permission-modes.md` — permission mode details
- `memory.md` — memory system (CLAUDE.md, auto-memory)
- `claude-directory.md` — .claude directory structure
- `env-vars.md` — environment variables
- `server-managed-settings.md` — enterprise managed settings
- `network-config.md` — network and proxy config
- `sandboxing.md` — sandbox modes
- `platforms.md` — supported platforms

### Agents & Automation
- `sub-agents.md` — sub-agent system
- `agent-teams.md` — multi-agent team patterns
- `skills.md` — skills/slash commands
- `hooks.md` — hooks reference
- `hooks-guide.md` — hooks guide
- `headless.md` — headless/non-interactive mode
- `scheduled-tasks.md` — scheduled/cron tasks
- `web-scheduled-tasks.md` — web-based scheduled tasks
- `remote-control.md` — remote control API
- `checkpointing.md` — checkpoint and restore
- `computer-use.md` — computer use capability
- `channels.md` — channels overview
- `channels-reference.md` — channels API reference
- `tools-reference.md` — tools reference
- `how-claude-code-works.md` — internals

### Plugins & MCP
- `plugins.md` — plugins overview
- `plugins-reference.md` — plugin API reference
- `discover-plugins.md` — finding plugins
- `plugin-marketplaces.md` — plugin marketplaces
- `mcp.md` — MCP server integration

### IDE Integrations
- `vs-code.md` — VS Code extension
- `jetbrains.md` — JetBrains plugin
- `chrome.md` — Chrome extension
- `desktop.md` — desktop app
- `claude-code-on-the-web.md` — web interface
- `slack.md` — Slack integration

### CI/CD & DevOps
- `github-actions.md` — GitHub Actions integration
- `github-enterprise-server.md` — GitHub Enterprise Server
- `gitlab-ci-cd.md` — GitLab CI/CD integration
- `code-review.md` — automated code review

### Cloud Providers
- `amazon-bedrock.md` — Amazon Bedrock setup
- `google-vertex-ai.md` — Google Vertex AI setup
- `microsoft-foundry.md` — Microsoft Foundry setup
- `llm-gateway.md` — LLM gateway/proxy config

### Security & Compliance
- `authentication.md` — authentication methods
- `security.md` — security model
- `legal-and-compliance.md` — legal/compliance info
- `data-usage.md` — data handling and privacy
- `zero-data-retention.md` — zero data retention mode

### Monitoring & Costs
- `costs.md` — pricing and cost management
- `monitoring-usage.md` — usage monitoring
- `analytics.md` — analytics and telemetry

### Troubleshooting
- `troubleshooting.md` — common issues and fixes
- `third-party-integrations.md` — third-party tool integration
- `devcontainer.md` — dev container setup

### Reference
- `changelog.md` — release changelog
- `llms.txt` — LLM-readable doc index (source manifest)

