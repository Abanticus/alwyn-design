Check layout consistency across all pages in this portfolio site.

Audit every file in `src/pages/` against these agreed standards:

**Layout standards:**
- Outer wrapper: `mx-auto max-w-6xl`
- Horizontal padding: `px-6`
- Vertical padding: `py-16 lg:py-20`
- Navbar: `max-w-6xl` (in `src/components/Navbar.tsx`)

**What to check:**
1. Every page file in `src/pages/` — confirm the inner content div uses all three standards above
2. `Navbar.tsx` — confirm it uses `max-w-5xl` not `max-w-6xl` or another value
3. Any section or container that overrides horizontal padding without a clear reason
4. Spot any pages missing `bg-background text-foreground` on the `<main>` element

Report findings as a table: page file, what matches, what deviates, and the fix needed. If everything is consistent, say so clearly.
