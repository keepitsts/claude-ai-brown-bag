# Step 0: Project Scaffold

## What to build
Initialize a Next.js 15 project with the complete toolchain. This is the foundation everything else builds on.

## Commands to run
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

## After scaffolding
1. Install all dependencies:
```bash
pnpm add zustand @tanstack/react-query react-leaflet leaflet @anthropic-ai/sdk lucide-react class-variance-authority clsx tailwind-merge date-fns
pnpm add -D @types/leaflet
```

2. Initialize shadcn/ui:
```bash
pnpm dlx shadcn@latest init -d
```

3. Add shadcn components we'll need:
```bash
pnpm dlx shadcn@latest add button card input label select skeleton alert badge separator scroll-area command dialog popover
```

4. Create the directory structure:
```bash
mkdir -p lib/api lib/types lib/constants hooks stores components/ui components/map components/briefing components/dashboard components/location
```

5. Create a `.env.local` file with placeholder API keys:
```
NASA_FIRMS_MAP_KEY=your_nasa_firms_key_here
FBI_CRIME_API_KEY=your_fbi_api_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
```

6. Create a `.env.example` file with the same keys but no values (for the repo).

7. Add `@tailwindcss/typography` plugin:
```bash
pnpm add @tailwindcss/typography
```

8. Verify the app starts: `pnpm dev` (briefly, then stop it)

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY scaffold and install. Do not build any features, components, or API routes yet. The app should show the default Next.js welcome page.
