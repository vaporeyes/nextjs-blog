# Personal Blog Enhancement Plan

**Objective**: Systematically refactor and enhance the Next.js personal blog by improving the codebase architecture, adding user-facing features, and boosting SEO.

## Phase 1: Codebase & Architecture Enhancements 🏗️

### Task 1.1: TypeScript Migration

**Goal**: Convert the project from JavaScript to TypeScript to improve code quality and maintainability, aligning with the project's own coding standards.

> **Prompt 1.1.1: Initial Setup** ✅ COMPLETED
>
> "Update the `package.json` to include necessary TypeScript types: `@types/react`, `@types/node`. Then, create a `tsconfig.json` file with Next.js default settings. Finally, rename all files in `pages/` and `components/` from `.js` to `.tsx`, and utility files like `components/utils.js` to `.ts`."

> **Prompt 1.1.2: Type Data Structures** ✅ COMPLETED
>
> "Create a new file `types/index.ts`. In this file, define and export a TypeScript `type` or `interface` for the markdown frontmatter data. It should include `id`, `title`, `date`, `tags` (as an array of strings), and `contentHtml`. Let's call it `ContentItem`."

> **Prompt 1.1.3: Apply Types to a Page** ✅ COMPLETED
>
> "Refactor `pages/posts/[id].tsx` to use TypeScript. Import the `ContentItem` type. Apply this type to the `postData` prop for the `Post` component and to the return value of the `getStaticProps` function. Use Next.js-provided types for `GetStaticProps` and `GetStaticPaths`."

---

## Phase 2: Feature Enhancements ✨

### Task 2.1: Search Functionality

**Goal**: Implement a client-side search feature to allow users to easily find content across the site.

> **Prompt 2.1.1: Add Search Dependency** ✅ COMPLETED
>
> "Add the `fuse.js` library to the project by running the appropriate package manager command."

> **Prompt 2.1.2: Create Search Index** ✅ COMPLETED
>
> "Modify `pages/index.tsx`'s `getStaticProps` function. In addition to fetching posts, recipes, etc., create a consolidated list of all content items. Write this list to a file named `search.json` inside the `public/` directory. This script should only run at build time."

> **Prompt 2.1.3: Build Search Component**
>
> "Create a new React component at `components/Search.tsx`. This component should:
>
> 1. Have an input field for the search query.
> 2. Use a `useEffect` hook to fetch `/search.json` on component mount.
> 3. Use `fuse.js` to search the index based on user input.
> 4. Display a list of matching results with links to the respective pages.
>
> Finally, add this `<Search />` component to the main layout in `components/layout.tsx`."

### Task 2.2: Tag Pages

**Goal**: Create dynamic pages for each tag to allow users to browse content by topic.

> **Prompt 2.2.1: Create Tag Page Route**
>
> "Create a new dynamic route file at `pages/tags/[tag].tsx`."

> **Prompt 2.2.2: Implement Data Fetching**
>
> "In `pages/tags/[tag].tsx`, implement `getStaticPaths` and `getStaticProps`.
>
> * `getStaticPaths` should gather all unique tags from every markdown file (`posts`, `recipes`, `fitness`) and return them as paths.
> * `getStaticProps` should find all content items that include the tag from the `params` and pass them to the page component as props."

> **Prompt 2.2.3: Build Tag Page UI**
>
> "In `pages/tags/[tag].tsx`, create a component that receives the filtered list of content items. It should display the tag name as a title (e.g., 'Posts tagged with "recipes"') and list the content items with links to their pages."

---

## Phase 3: SEO & Content Discoverability 🚀

### Task 3.1: RSS Feed Generation

**Goal**: Provide an RSS feed so that readers can subscribe to blog updates.

> **Prompt 3.1.1: Add RSS Package & Script**
>
> "Add the `feed` package to the project. Then, create a new script at `lib/rss.ts`. This script should export a function `generateRssFeed` that:
>
> 1. Fetches all sorted post data.
> 2. Uses the `feed` package to construct an RSS feed in XML format.
> 3. Saves the output as `rss.xml` in the `public/` directory."

> **Prompt 3.1.2: Trigger RSS Generation**
>
> "Modify the `build` script in `package.json` or call the `generateRssFeed` function within `getStaticProps` on the homepage to ensure the RSS feed is generated every time the site is built."

### Task 3.2: Dynamic Meta Tags

**Goal**: Improve social sharing previews and SEO by adding dynamic meta tags to content pages.

> **Prompt 3.2.1: Update Layout/Page Component**
>
> "Using the code from `pages/posts/[id].tsx` as a template, create a reusable `ContentPage` component in `components/ContentPage.tsx`. This component will render the title, date, tags, and HTML content.
> Inside this component, use the `next/head` component to dynamically set the following meta tags based on the `postData` prop:
>
> * `<title>`
> * `<meta name="description" ... />` (use the first ~150 characters of the content)
> * `<meta property="og:title" ... />`
> * `<meta property="og:description" ... />`"

> **Prompt 3.2.2: Refactor Pages to Use ContentPage**
>
> "Refactor `pages/posts/[id].tsx`, `pages/recipes/[id].tsx`, and `pages/fitness/[id].tsx` to import and use the new `ContentPage` component, passing the fetched `postData` as a prop. This will centralize the page layout and SEO logic."
