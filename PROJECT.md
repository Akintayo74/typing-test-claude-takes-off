# Typing Speed Test App - Project Specifications

## Project Overview
A typing speed test application built for a hackathon.

**Design Assets:** Figma file available via MCP integration

---

## Tech Stack

### Core
- **Build Tool:** Vite
- **Framework:** React 19+ with TypeScript
- **Routing:** React Router
- **Package Manager:** Bun

### Styling
- **Primary:** CSS Modules (plain CSS, no Tailwind)
- **PostCSS Plugins:**
  - `postcss-nesting` - For nested selectors
  - `postcss-custom-media` - For responsive breakpoints
- **Approach:** Mobile-first responsive design

---

## Project Architecture

Following [Josh Comeau's function-based architecture](https://www.joshwcomeau.com/react/file-structure/):

```
src/
├── components/          # UI components (organized by function, not feature)
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.module.css
│       ├── index.ts
│       └── [component-specific helpers/types if needed]
├── hooks/              # Reusable hooks shared across components
├── helpers/            # Project-specific utility functions
├── styles/             # Global styles and media queries
│   └── media.css       # PostCSS custom media definitions
├── constants.ts        # App-wide configuration (breakpoints, etc.)
├── utils.ts            # Generic reusable functions (copy-paste across projects)
├── App.tsx
└── main.tsx
```

### Key Principles
- **Organize by function, not feature** - Avoids boundary disputes and scales better
- **Index forwarder pattern** - Each component folder has `index.ts` for clean imports
- **Named component files** - `ComponentName.tsx` instead of just `index.tsx` for clear editor tabs
- **Colocation** - Component-specific helpers/types live with the component
- **Kebab-case file names** - For non-component files (e.g., `use-boop.ts`)

---

## Component Spectrum

Components exist on a spectrum from **primitive** to **page-level**, each with different responsibilities:

```
Primitive ←————————————————————————————→ Page-level
(Low-level UI)                          (Layout & Composition)
```

### The Three Layers

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Primitives** | Pure UI, no layout opinions. Handles interaction logic (clicks, state) but not *where* it appears. | `DifficultySelector`, `ModeSelector`, `Button` |
| **Helpers** | Extracted logic, types, constants. Shared across components. | `settings.helpers.ts` with types and utilities |
| **Composites** | Layout and composition. Arranges primitives, handles spacing and positioning. | `Stats` (navbar that composes selectors + stats display) |

### Why This Matters

1. **Reusability** - Primitives can be used anywhere without bringing layout baggage
2. **Separation of concerns** - UI logic stays separate from page layout decisions
3. **Easier debugging** - When layout breaks, you know to look at the composite, not the primitive
4. **Flexibility** - Same primitive can appear in different layouts (e.g., settings in a navbar vs. a modal)

### Practical Example

```
Stats (composite - handles layout)
├── statsRow (WPM, Accuracy, Time)
├── DifficultySelector (primitive - just buttons/dropdown)
└── ModeSelector (primitive - just buttons/dropdown)

settings.helpers.ts (shared logic)
├── types: Difficulty, Mode
├── constants: difficultyOptions, modeOptions
└── utilities: capitalizeFirst(), getModeLabel()
```

The composite (`Stats`) uses `display: flex` + `justify-content: space-between` to position things. The primitives don't know or care about their position - they just render their UI.

---

## Component Scaffolding

### Using new-component
**Important:** Always use the `-l ts` flag for TypeScript:
```bash
new-component ComponentName -l ts
```

This generates:
- `ComponentName/ComponentName.tsx` - Main component with CSS modules import
- `ComponentName/index.ts` - Barrel export
- `ComponentName/ComponentName.module.css` - Starts with `@import '../../styles/media.css';`

### Component Template Structure
```tsx
import * as React from 'react';
import styles from './ComponentName.module.css';

function ComponentName() {
  return (
    <div className={styles.container}>

    </div>
  )
}

export default ComponentName;
```

---

## Coding Conventions

### React Hooks
**Always use the `React.` namespace format instead of destructuring:**

✅ **Correct:**
```tsx
import * as React from 'react';

function Component() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // effect logic
  }, []);
}
```

❌ **Avoid:**
```tsx
import { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  // ...
}
```

### Import Organization
1. React imports first (`import * as React from 'react'`)
2. Third-party libraries
3. Internal imports (components, hooks, helpers)
4. Styles last
5. Type imports separate with `import type`

---

## Styling Conventions

### CSS Custom Properties (Design Tokens)
**Always use CSS variables for colors, spacing, typography, and other design values.**

All design tokens are defined in `src/index.css` as CSS custom properties based on:
- Figma design variables
- `style-guide.md` specifications

**Examples:**
```css
/* ✅ Correct - Use CSS variables */
.button {
  background-color: var(--color-blue-400);
  padding: var(--spacing-200) var(--spacing-300);
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);
}

/* ❌ Avoid - Hard-coded values */
.button {
  background-color: #4ca6ff;
  padding: 16px 24px;
  font-size: 16px;
  border-radius: 8px;
}
```

**Available token categories:**
- `--color-*`: Colors from style guide (neutral, blue, red, green, yellow)
- `--spacing-*`: Spacing scale (100-600 based on 8px grid)
- `--font-*`: Typography tokens (family, size, weight, line-height, letter-spacing)
- `--radius-*`: Border radius values

### Mobile-First Approach
Write base styles for mobile, then progressively enhance for larger screens using min-width media queries.

### Breakpoints
```css
/* In src/styles/media.css */
@custom-media --tablet (min-width: 550px);
@custom-media --laptop (min-width: 1100px);
@custom-media --desktop (min-width: 1500px);
```

### Usage Example
```css
@import '../../styles/media.css';

.container {
  /* Mobile styles (base) */
  padding: 16px;
  font-size: 14px;
}

@media (--tablet) {
  .container {
    /* Tablet and up */
    padding: 24px;
    font-size: 16px;
  }
}

@media (--laptop) {
  .container {
    /* Laptop and up */
    padding: 32px;
  }
}

@media (--desktop) {
  .container {
    /* Desktop and up */
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

### CSS Modules
- One module per component: `ComponentName.module.css`
- Import media queries from global: `@import '../../styles/media.css';`
- Use PostCSS nesting for better DX
- Avoid inline styles unless absolutely necessary

---

## Development Workflow

### Component Creation
1. Use `new-component ComponentName -l ts`
2. Update the component logic in `ComponentName.tsx`
3. Add styles in `ComponentName.module.css`
4. Import and use via `import ComponentName from '@/components/ComponentName'`

---

## Future Enhancements
- [ ] Bundle path aliases configuration (`@/components`, `@/hooks`, etc.)
