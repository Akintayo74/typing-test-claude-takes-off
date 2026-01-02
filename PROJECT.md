# Typing Speed Test App - Project Requirements & Preferences

## Project Overview
A typing speed test application built for a hackathon. Primary goal is to learn AI-assisted development workflows with Claude Code.

**Developer:** Akintayo (early intermediate frontend developer)
**Design Assets:** Figma files available (MCP integration to be set up later)

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
- **Philosophy:** Prefer plain CSS abstractions over utility-first approaches

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

### CSS Module Template
```css
@import '../../styles/media.css';

/* Component styles here */
```

---

## Development Workflow

### Component Creation
1. Use `new-component ComponentName -l ts`
2. Update the component logic in `ComponentName.tsx`
3. Add styles in `ComponentName.module.css`
4. Import and use via `import ComponentName from '@/components/ComponentName'`

---

## AI Collaboration Preferences

### Communication Style
- **Conversational and educational** - Explain decisions and trade-offs
- **No rigid frameworks** - Prefer hybrid conversational approach
- **Ask when uncertain** - Better to clarify than assume

### Code Quality
- Write clean, readable code (early intermediate level)
- Avoid over-engineering
- Explain complex patterns
- Focus on learning and understanding, not just getting it done

---

## Future Enhancements
- [ ] Figma MCP server integration for design file access
- [ ] Bundle path aliases configuration (`@/components`, `@/hooks`, etc.)

---

## Notes
- First time using Claude Code - prioritize learning the workflow
- May or may not submit to hackathon - focus is on building with AI effectively
- Reference this doc to maintain consistency across the project
