# News Aggregator

A news browsing app built with Vue 3 and TypeScript — created to practice state management and performance patterns by building something real.

---

## About

News Aggregator lets you browse headlines by category and search by keyword, powered by the GNews API. Results update as you type, navigation preserves your place, and pagination keeps the feed manageable.

**Why I built this:** I'm learning Vue by doing — not just reading docs. This project covers debounced search, Pinia store design, `<keep-alive>` for navigation state, and composable patterns in a practical context.

---

## Tech Stack

| Tool       | Version |
| ---------- | ------- |
| Vue        | 3       |
| TypeScript | 5       |
| Vite       | 5       |
| Pinia      | 2       |
| GNews API  | free    |

---

## Setup

**Requirements:**

- Node.js 18+
- VS Code with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- A free GNews API key from [gnews.io](https://gnews.io)

**Install and run:**

```bash
npm install
npm run dev
```

**Environment variables:**

Create a `.env` file in the project root:

```
VITE_GNEWS_API_KEY=your_key_here
```

---

## Features

- Browse headlines by category — science, sports, technology, business, health, entertainment, world
- Search by keyword with 500ms debounced input — no unnecessary API calls while typing
- Pagination with previous/next controls and "page X of Y" display
- Article detail page — click any headline to read more
- Back navigation preserves list state — same category, search, and page
- Loading and error states handled throughout
- Reusable `useDebounce()` composable for any future project

---

## Key Concepts Practiced

- **Debounced search** — `useDebounce` composable wraps a ref and delays its update using `setTimeout` and `clearTimeout`
- **Pinia store** — single source of truth for articles, pagination, search query, category, loading, and error state
- **`<keep-alive>`** — caches the `ResultPage` component so returning from an article doesn't trigger a refetch
- **Smart URL switching** — `fetchArticles` uses the `/top-headlines` endpoint for category browsing and `/search` for keyword queries
