# Structure Your Code, Enforce Standards

## Slide

**Title:** Structure Your Code, Enforce Standards

- Agents follow patterns. **The more consistent your codebase, the better the agent performs** — it reads existing code and mimics what it sees
- Types are the agent's guardrails — **TypeScript strict mode catches the agent's mistakes at compile time** before they reach you
- A consistent architecture means the agent doesn't have to guess. "See weather.ts for the pattern" works because every API follows the same structure
- **Linters, formatters, and type checkers are force multipliers** — they're free feedback loops that run in milliseconds and catch entire categories of errors
- Think of your codebase as the agent's training data for your project. **Messy code produces messy output**

---

## Notes

### Why Structure Matters More for Agents Than for Humans

Human developers can navigate inconsistent codebases through tribal knowledge, Slack messages, and gut feeling. Agents have none of that — they have exactly what's on the whiteboard and what's in the files.

When your codebase has consistent patterns:
- The agent reads one example and applies it to new features correctly
- "See lib/api/weather.ts for the pattern" is a complete instruction
- New code looks like existing code — reviewable at a glance

When your codebase is inconsistent:
- The agent picks up conflicting patterns and produces a hybrid that matches nothing
- You spend review time explaining "no, not like that file, like this other file"
- The same prompt produces different quality depending on which files the agent happens to read first

### Types as Agent Guardrails

**TypeScript strict mode** is the single highest-ROI investment for agentic coding:

- **Compile-time error catching** — `tsc --noEmit` catches type errors in under a second. The agent generates code, runs the compiler, reads the error, fixes it — all in the agent loop.
- **Self-documenting interfaces** — When the agent reads a TypeScript interface, it knows exactly what shape data should take. No guessing, no hallucinating field names.
- **Refactoring safety net** — When the agent changes a type, the compiler immediately flags every file that needs updating. The agent can chase errors across the codebase automatically.
- **Error types** — Well-defined error types tell the agent what can go wrong and how to handle it.

```typescript
// This interface IS the documentation for the agent
interface WeatherResponse {
  temperature: number;      // Fahrenheit
  windSpeed: number;        // mph
  humidity: number;         // percentage
  conditions: WeatherCondition;
  forecast: DailyForecast[];
}
```

The agent reads this and knows exactly what to build. No ambiguity, no hallucination risk for the data shape.

### Architecture as a Pattern Library

A consistent architecture means every new feature follows the same structure:

```
lib/api/weather.ts        → API client wrapper
app/api/weather/route.ts  → Next.js route handler
hooks/useWeather.ts       → TanStack Query hook
components/WeatherCard.tsx → UI component
```

When you add a new feature (seismic data), the agent reads the weather implementation and produces:

```
lib/api/seismic.ts
app/api/seismic/route.ts
hooks/useSeismic.ts
components/SeismicCard.tsx
```

The pattern carries itself. You don't need to specify file locations, naming conventions, or data flow — the agent infers it from the existing structure.

### Enforcing Standards Automatically

| Tool | What It Catches | Agent Integration |
|------|----------------|-------------------|
| `tsc --noEmit` | Type errors, missing imports, wrong shapes | Agent runs it in the loop, reads errors, self-corrects |
| `eslint` | Style violations, unused vars, potential bugs | Agent can run and auto-fix |
| `prettier` | Formatting inconsistencies | Agent can run as post-step |
| `npm run build` | Build errors, SSR issues, bundling problems | Verification gate between features |

These tools are deterministic checks on probabilistic output. They don't cost tokens, they run in milliseconds, and they catch entire categories of errors that the model might miss.

### Daily Actions

- Use TypeScript strict mode — never `any`, never `@ts-ignore` unless absolutely necessary
- Maintain consistent file and directory structure across features
- Add type definitions for all API responses, component props, and store state
- Run linters and formatters automatically (pre-commit hooks or in the agent's verification step)
- When you see inconsistency, refactor it — you're improving the agent's pattern library
