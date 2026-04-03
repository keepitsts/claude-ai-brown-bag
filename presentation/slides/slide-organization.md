# Slide Organization

Three acts, like "This American Life" — each act has a theme, a tone shift, and a reason you care.

---

## ACT 1: Agentic Concepts

**Theme:** What is this stuff and why should I care?

Take the audience from zero to fluent in the core concepts of agentic engineering. By the end of Act 1, they understand what a model is, what an agent is, how tokens and context work, and why markdown refinement chains are the workflow.

**Slides:**
1. What Is a Model?
2. How Does a Model Know Things?
3. What Are the Differences Between the Claude Models?
4. What Is a Token?
5. Why Do We Have to Be Token Efficient?
6. What Is an Agent?
7. What Is the Context Window?
8. Why Do We Use Markdown?
9. What Is a Markdown Refinement Chain?

**Directory:** `act-1-agentic-concepts/`

---

## ACT 2: How I Built a Demo App

**Theme:** Watch the concepts in action — here's what it actually looks like.

Walk through the real story of building TRAILHEAD: the refinement chain of markdown artifacts, the headless build pipeline, CLAUDE.md as persistent memory, verification gates, and the debug loop. This is the live proof that Act 1's concepts work.

**Slides:**
1. Step 1 — Who Am I Presenting To? (STS audience research)
2. Step 2 — What Free Data Can I Use? (open datasets)
3. Step 3 — What Should the App Do? (app spec)
4. Step 4 — What Tech Stack Should I Use? (tech stack decision record)
5. Step 5 — Bootstrap the Repo with One Prompt (repo setup + CLAUDE.md)
6. Step 6 — How Do I Make Claude Code Build It While I Walk My Dog? (build strategy research)
7. Step 7 — "Let's Start Implementing" (11 steps, 0 failures)
8. Step 8 — The Pipeline Built It. Then Reality Hit. (debug loop)
9. Step 9 — Ship It (deploy to Vercel)

**Directory:** `act-2-how-i-built-a-demo-app/`

---

## ACT 3: How to Improve Your Agentic Techniques

**Theme:** Now go do it — here's how to get better starting Monday.

Practical takeaways the audience can apply immediately. TAC framework tactics, CLAUDE.md best practices, prompt design patterns, when to use which model, how to set up verification gates, and the progression from in-the-loop to out-of-the-loop to zero-touch.

**Slides:**
1. Stop Coding
2. Adopt Your Agent's Perspective (Core Four, 12 leverage points)
3. Document Your App for Your Agent (progressive disclosure, CLAUDE.md → docs/)
4. Spec First, Plan Second, Build Last (spec → plan → build, iterate on the plan not the code)
5. Structure Your Code, Enforce Standards (types, architecture, linters)
6. Research Best Practices for Your Codebase (refinement chain for maintenance, research prompts with codebase context)
7. Capture Tech Debt, Refactor Often (agents as cheap refactoring machines)
8. Get Out of the Loop (in-the-loop → out-of-the-loop → zero-touch, PITER framework)
9. Have Claude Run Your Tools, Not You (standard out, verification gates)
10. Always Add Feedback Loops (closed-loop prompts, stacking validation)
11. Agentic SDLC Workflows (templates, one agent one purpose, ADWs, getting started)

**Directory:** `act-3-how-to-improve-your-agentic-techniques/`
