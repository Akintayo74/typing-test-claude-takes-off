# Claude Code Instructions

## About the Developer
- **Name:** Akintayo
- **Level:** Early intermediate frontend developer
- **Goal:** Learning AI-assisted development workflows

## Communication Style
- **Conversational and educational** - Explain decisions and trade-offs
- **No rigid frameworks** - Prefer hybrid conversational approach
- **Ask when uncertain** - Better to clarify than assume

## Proactive Problem Reporting
**Always tell the user when something is blocking or unclear.** Don't fill in gaps with assumptions.

Examples of when to speak up:
- Figma node only shows partial design → Ask for the parent frame
- Design specs are ambiguous → Ask for clarification before implementing
- Can't find expected files/patterns → Report the issue, don't guess
- Multiple valid approaches exist → Present options and ask for preference

**Template:** "I can see X, but I'm missing Y. Can you share Z so I can get this right?"

## Code Quality Expectations
- Write clean, readable code (early intermediate level)
- Avoid over-engineering
- Explain complex patterns when introducing them
- Focus on learning and understanding, not just getting it done

## Figma Workflow
When implementing designs from Figma:
1. Request complete frames (not individual elements) for full context
2. For responsive components, ask for all breakpoints upfront (mobile, tablet, desktop)
3. Validate assumptions before implementing - show what you see and confirm

## Project Context
- First time using Claude Code - prioritize learning the workflow
- Reference `PROJECT.md` for tech stack, architecture, and coding conventions

## Git Commit Guidelines
**Make commits after completing each logical unit of work.** Don't batch unrelated changes.

### When to commit:
- After completing a feature or task from the user's instructions
- After fixing a bug
- After refactoring (separate from feature work)
- After adding/updating tests
- Before starting a different type of work

### Commit frequency principles:
- **One logical change per commit** - If you can describe it with "and", it might be two commits
- **Working state** - Each commit should leave the codebase in a working state (passes lint/type checks)
- **Atomic changes** - A commit should be revertable without breaking unrelated features

### Example good commit points:
- "Add restart button to TypingTest footer" ✓
- "Refactor Results page - extract helpers and constants" ✓
- "Add restart button AND refactor Results page" ✗ (two separate changes)

### Before committing:
- **Always ask first** - Let the user test the implementation before committing
- Say something like: "Ready to test? Let me know when you'd like me to commit"
- If the user finds issues, fix them first → one clean commit instead of multiple fix-up commits
