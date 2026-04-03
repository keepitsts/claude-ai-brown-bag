# What Is a Model?

## Slide

**Title:** What Is a Model?

- It's not Google (search engine), not a hard drive (database), not a calculator — it's a **very well-read colleague** who learned by reading millions of codebases and books
- Ask it the same question twice, you might get two different answers — like asking two senior engineers the same design question
- It **reasons through problems**, not looks up answers — predicting good code requires understanding what good code looks like
- It can write your app but can't add large numbers reliably — brilliant with patterns, unreliable with precision
- It graduated on a specific date and hasn't read anything since — anything after its training cutoff is a blind spot

---

## Notes

### It's Not What You Think It Is

Most people's first instinct is to treat an LLM like a search engine or a database — you type a question, it looks up the answer. That's not what's happening. The model is a transformer neural network that has absorbed statistical patterns from enormous amounts of code and text during training. When you give it a prompt, it generates what is most likely to come next, one token at a time.

### How It Actually Works

- **Transformer architecture**: The model processes input through layers of attention mechanisms that weigh relationships between every token in the context. This is what lets it understand code structure, follow long chains of logic, and maintain coherence across thousands of tokens.
- **Next-token prediction**: At its core, the model predicts the probability distribution over all possible next tokens, then samples from that distribution. This is why the same prompt can produce different outputs — it's sampling from probabilities, not looking up a fixed answer.
- **Emergent reasoning**: Ilya Sutskever's insight — predicting the ending of a detective novel requires understanding the entire plot. When the "next token" requires genuine insight to predict correctly, the model has to have internalized that reasoning capability. Predicting good code requires understanding what good code looks like.

### What It's Good At vs. What It Struggles With

**Strengths:**

- **Pattern recognition and code generation** — It has seen millions of codebases. It recognizes architectural patterns, API conventions, framework idioms, and common bug patterns. It can generate idiomatic code in dozens of languages.
- **Reasoning through well-represented problems** — If the type of problem appeared frequently in training data (web apps, REST APIs, data transformations, algorithm implementations), the model reasons through it effectively.
- **Summarization and synthesis** — Condensing large amounts of information, explaining code, comparing approaches, generating documentation.
- **Brainstorming and exploration** — Generating multiple approaches to a problem, identifying edge cases, suggesting alternative architectures.

**Weaknesses:**

- **Precise arithmetic and counting** — The model approximates; it doesn't calculate. Don't ask it to count tokens, add large numbers, or do exact math without a tool.
- **Guaranteed factual accuracy** — There is no internal fact-check step. The model optimizes for fluency (what sounds right), not accuracy (what is right). When fluency and accuracy conflict, fluency wins. This is why hallucination happens.
- **Knowledge after training cutoff** — The model's parametric knowledge is frozen at its cutoff date. Anything after that date is unknown unless you supply it in context. Opus 4.6 cutoff: May 2025. Sonnet 4.6: August 2025.
- **Deterministic behavior** — Same prompt, different run, potentially different output. This is a feature of the probabilistic architecture, not a bug — but it means you need verification, not trust.

### The Three-Column Mental Model

| Database | Search Engine | LLM |
|----------|---------------|-----|
| Key in, exact value out | Query in, existing documents out | Prompt in, generated response out |
| Deterministic | Retrieval-based | Probabilistic reasoning |
| Looks up stored data | Finds existing content | Creates new content from patterns |

This comparison is the key reframe for your audience. Engineers are used to deterministic systems. An LLM is fundamentally probabilistic — and that changes everything about how you verify its output.

### Why This Matters for Agentic Engineering

The probabilistic nature of models is exactly why agentic engineering exists. If models were deterministic and always correct, you'd just call them once and trust the output. Because they're probabilistic:

- You need **verification gates** (TypeScript compilation, build checks, test suites) to catch the output that sounds right but isn't
- You need **the agent loop** (think, act, observe, repeat) so the model can self-correct when verification fails
- You need **fresh context** to avoid degradation — the model's attention mechanism works best when context is focused, not bloated
- You need **CLAUDE.md and system prompts** to constrain the model's behavior into consistent, predictable patterns

The entire agentic engineering discipline is built on the answer to this slide's question: it's a powerful reasoning engine that needs structure, verification, and good context to produce reliable output.