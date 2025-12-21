---
title: 'AI-Assisted Development: Building Strong Stats with Claude'
date: '2025-10-01'
tags:
  - programming
  - ai
  - claude
  - nextjs
  - fitness
---

## The Problem

I use the Strong app to track my workouts. It's great for logging sets and reps, but its analytics are pretty basic. I wanted to see trends over time, compare exercises, track volume progression - the kind of insights that help you understand if your training is actually working.

A large part of my motivation to build this was in finding an existing app written in Streamlit that I thought would work well as a NextJS SPA.

Strong exports data as CSV, so the data was there. I just needed to build something to visualize it.

## The Speed Run: MVP in a Day

Sometime in September, I sat down with Claude and went from `npx create-next-app` to a deployed, working app in a single day. Eleven commits, starting at 5:34 AM and wrapping up that evening.

The core pieces came together fast:

- CSV parser that handles Strong's export format (including multi-language support)
- Data aggregation for workout and exercise-level metrics
- Interactive charts with Recharts
- File upload, date filtering, export functionality

By the end of the day, I had something that worked. You could upload your Strong CSV, see your workout history visualized, filter by date range, and export charts. It was functional, but it wasn't _good_.

## The Real Work: Structured AI-Assisted Development

The next phase is where things got interesting. Instead of just throwing prompts at Claude and hoping for the best, I developed a structured approach using what I call a "prompt plan."

### The Three-Layer Plan

The plan had three layers:

1. **Big-Picture Blueprint** - What we're building and why. A high-level table mapping phases to goals to deliverables.

2. **Iterative Chunks** - The work broken into coherent "sprints" that stack cleanly. Each chunk is a logical unit of functionality.

3. **Codex Prompt Series** - Granular, test-driven prompts. One per step. Each prompt is self-contained and can be pasted directly into Claude.

### Chunks and Steps

The UI revamp was broken into 10 chunks:

| Chunk | Focus                                            |
| ----- | ------------------------------------------------ |
| C0    | Foundation - branch, deps, testing setup         |
| C1    | Global Header - sticky bar, theme toggle         |
| C2    | Filter Bar - date picker, URL sync               |
| C3    | KPI Cards - glanceable metrics                   |
| C4    | Tabbed Main Content - Trends, Insights, Raw Data |
| C5    | Context Drawer - settings panel                  |
| C6    | Visual Polish - tokens, dark mode                |
| C7    | Interaction Improvements - tooltips, skeletons   |

Each chunk was further decomposed into 5-7 steps. For example, C1 (Global Header) had:

- C1-S1: Scaffold Header component with logo slot
- C1-S2: Add Export / Share / Upload buttons
- C1-S3: User avatar dropdown with dark-mode toggle
- C1-S4: Make header sticky with scroll shadow
- C1-S5: Unit + visual regression tests

### Test-Driven Prompts

Every prompt followed the same structure:

```text
# Context
What's already built, what we're adding to

# Task
Numbered steps with specific implementation details

# Tests
Concrete acceptance criteria - what must pass
```

The key insight: **tests are specified before implementation**. Each prompt tells Claude exactly what tests to write, then what code to write to make them pass. This isn't just good practice - it gives the AI a clear target and makes it much harder to go off track.

Here's an abbreviated example from C1-S4:

```
# Context
Header must stay visible and gain subtle shadow only after
the user scrolls past 24 px.

# Task
1. Give <Header> Tailwind classes: sticky top-0 z-30...
2. Implement useScrollShadow hook
3. When scrolled is true, add shadow-md
4. Debounce scroll handler with requestAnimationFrame

# Tests
- RTL: mock window.scrollY = 0 -> header lacks .shadow-md
- RTL: mock window.scrollY = 100 -> header has .shadow-md
- Playwright: scroll dashboard, assert header still visible
```

### The Workflow

Each "section of work" looked roughly like this:

1. Pick the next step from the plan (e.g., C2-S3)
2. Paste the prompt into Claude
3. Review the generated code and tests
4. Run tests, fix any issues
5. Commit with a descriptive message
6. Update the progress table in the prompt plan
7. Move to next step

The progress tables made it easy to track where I was:

```
| Step      | Prompt ID               | Status |
| --------- | ----------------------- | ------ |
| **C2-S1** | DateRangePicker         | done   |
| **C2-S2** | Filter Context provider | done   |
| **C2-S3** | URL query-param sync    | done   |
| **C2-S4** | Mobile collapse         | done   |
| **C2-S5** | Unit + Playwright       | done   |
```

## What Made This Work

A few things made this approach effective:

**1. Context Preservation**

Each prompt included just enough context about what already existed. Claude doesn't need to understand the entire codebase - it needs to understand the specific integration points for this step.

**2. Feature Flags**

New work was always behind a feature flag. This meant I could merge incrementally without breaking production. The prompt plan explicitly called this out: "Each phase releases real value behind a feature flag so production is always stable."

**3. Explicit Dependencies**

The plan mapped dependencies between chunks. C4 (Tabs) depended on C1 (Header) and C2 (Filters). This prevented me from jumping ahead and creating integration headaches.

**4. Test-First Mentality**

By specifying tests in the prompt, I got two benefits: Claude writes the tests (which I'd have to write anyway), and the tests serve as acceptance criteria that tell me when a step is actually done.

**5. Small Steps**

Each step was small enough to complete in one session. If a step feels too big, it probably needs to be split. The C3 (KPI Cards) chunk had separate steps for the component, the data hook, the grid layout, skeleton animations, and tests.

## The Tech Stack

For those interested in the specifics:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4
- **Components**: Headless UI for accessible primitives
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State**: Zustand
- **CSV Parsing**: PapaParse
- **Testing**: Jest + React Testing Library + Playwright

The app is a PWA that works offline. All data processing happens client-side - your workout data never leaves your browser.

## Lessons Learned

**Break it down further than you think necessary.** A step that says "implement the header" is too vague. A step that says "add three icon buttons with specific aria-labels that collapse into a menu below 640px" gives Claude exactly what it needs.

**Write the tests into the prompt.** Don't leave testing as an afterthought or a separate step. Include the specific test cases you expect, and Claude will write both the tests and the code that passes them.

**Keep a living progress document.** The prompt plan wasn't just a planning artifact - it was updated after every step. This made it easy to resume after breaks and track overall progress.

**Feature flags are worth the overhead.** Being able to merge daily without breaking prod meant I could move fast and maintain momentum.

**The AI is a collaborator, not a replacement.** I still reviewed every line of code, ran every test, and made judgment calls about architecture. Claude dramatically accelerated the typing and the boilerplate, but the decisions were mine.

## The Result

Strong Stats went from a rough MVP to a polished, accessible, mobile-friendly app over the course of a couple of weeks. It has:

- Responsive KPI cards with trend indicators
- Interactive charts with collapsible legends
- Per-exercise drill-downs with sparklines and 1RM estimation
- Dark mode with proper contrast ratios
- Keyboard navigation and screen reader support
- Lighthouse scores above 90 across the board

More importantly, I have a methodology I can reuse. The prompt-plan approach works for any substantial feature work. Write the plan, break it into chunks, break chunks into test-driven steps, execute one at a time.

The app can be found at [strongstats.fitness](https://strongstats.fitness).
