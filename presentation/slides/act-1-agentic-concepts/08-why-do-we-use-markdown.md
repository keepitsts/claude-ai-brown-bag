# Why Do We Use Markdown?

## Slide

**Title:** Why Do We Use Markdown?

- It's the **one format both you and the AI read natively** — no parsing, no conversion, no special tools. You write it, the model reads it, done
- Markdown is **structured enough to convey priority** — headers signal sections, bold signals importance, code blocks signal "use this exactly." The model picks up on all of it
- It's **diffable, committable, and version-controlled** — your prompts, specs, and research live in git alongside your code, not lost in a chat window
- Every step of the process is a markdown file: spec, research, CLAUDE.md, build prompts — **markdown in, software out**
- If you can write a good README, you can drive an agent. There's no special "prompt language" — **it's just clear writing**

---

## Notes

### Markdown as the Universal Interchange Format

In agentic engineering, information moves constantly between humans and models — specs, instructions, research results, code context, build prompts. Markdown works as the interchange format because it satisfies both sides:

**For humans:**
- Readable in any text editor, GitHub, VS Code preview, or just `cat` in a terminal
- Familiar to every software engineer — READMEs, docs, wikis, PR descriptions
- Easy to write quickly without tooling

**For models:**
- Parsed natively during training — models have seen millions of markdown documents
- Structure maps to attention priority (more on this below)
- No special tokens or formatting needed — just text

### How Markdown Structure Maps to Model Behavior

Models don't treat all text equally. Markdown formatting carries semantic weight:

| Markdown Element | How the Model Interprets It |
|-----------------|----------------------------|
| `# Heading` | Major section boundary — resets context focus |
| `**bold text**` | Higher priority instruction — gets more attention weight |
| `- bullet point` | Discrete item in a list — treated as a separate instruction |
| `` `code block` `` | Exact syntax — should be used literally, not paraphrased |
| `> blockquote` | Referenced/quoted material — distinct from direct instructions |
| `---` (horizontal rule) | Section separator — signals a context boundary |

This is why CLAUDE.md files use bold for critical conventions and code blocks for exact commands — the formatting isn't decorative, it's functional. A bold "**Do NOT use tailwind.config.js**" gets more attention than a plain sentence.

### Why Not JSON, YAML, or XML?

- **JSON** — Great for machine interchange, painful for humans to read and write. A 50-line spec in JSON is 150 lines with braces and quotes.
- **YAML** — Readable but whitespace-sensitive in ways that cause subtle bugs. Models sometimes generate invalid YAML.
- **XML** — Verbose, hard to read, overkill for natural-language instructions.
- **Plain text** — No structure. The model can't distinguish a heading from a detail, a critical instruction from a casual note.
- **Markdown** — Structured enough to convey hierarchy and priority, lightweight enough to write in seconds, readable by both humans and machines without any tooling.

### Markdown in the Agentic Workflow

Every stage of agentic engineering uses markdown:

**Configuration:**
- `CLAUDE.md` — Project conventions, build commands, critical rules
- System prompts — Persistent instructions for agent behavior

**Research:**
- Research prompts — Structured questions fed into claude.ai
- Research results — Synthesized findings saved as .md files

**Specification:**
- Feature specs — What to build, API details, acceptance criteria
- Tech stack decisions — What was chosen and why

**Build:**
- Build prompts — Per-feature specs with "patterns to follow" sections
- Build scripts — Reference markdown files via `cat build/prompts/XX.md`

**Communication:**
- PR descriptions, commit messages, documentation — all markdown

### The "Prompt Engineering" Demystification

There's a mystique around "prompt engineering" — as if there's some secret language for talking to AI. With markdown, the skill is just clear technical writing:

- State what you want built (heading + bullets)
- Provide the context needed (attached markdown files)
- Specify constraints ("implement ONLY what is specified")
- Point to patterns ("see lib/api/weather.ts for the pattern to follow")

If you've ever written a good ticket, a clear README, or a detailed code review — you already have the skill. The format is markdown. The craft is clarity.

### Why It Beats Chat Windows

Prompts and research typed into a chat window are:
- **Ephemeral** — lost when the session ends or the window closes
- **Not diffable** — you can't see what changed between version 1 and version 2
- **Not shareable** — a teammate can't re-run your exact prompt
- **Not version-controlled** — no git history, no blame, no rollback

Markdown files in a repo are the opposite of all of those. The entire reasoning chain — from initial research to final build — is transparent, repeatable, and auditable as plain text in git.
