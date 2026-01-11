# Healf Full-Stack Assessment

## Demo

https://drive.google.com/file/d/1G3A_TLkuTgSdqolpDvWDZanePsLX8n7g/view?usp=sharing

## System Requirements

- Node.js 18+
- npm or yarn
- Any modern browser

## Setup

```bash
git clone <repository-url>
cd healf-full-stack-assessment
npm run install
npm run dev  # Runs on http://localhost:3000
```

## Overview of Search Implementation

### Approach

The search implementation uses MiniSearch, a lightweight full-text search library that provides indexing, fuzzy matching, and autocomplete out of the box.

1. CSV file is parsed once on the first request and cached in memory
2. Products are indexed by MiniSearch across multiple fields (title, vendor, description, product type, tags)
3. Results are filtered, sorted, and paginated server-side includes fuzzy matching, partial search, auto suggestions, etc.
4. Client receives only the current page of results for display and more products can be loaded based on demand by using infinite scroll
5. Filters and Search states are persisted in URL query parameters for better UX.

## Additional Features

Beyond basic search, I've added:

**Filtering**

Products can be filterd by:

- Price range
- Vendor
- Product type

**Sorting**

- Price: Low to High / High to Low
- Rating: Best rated first
- Newest arrivals

## Technical Decisions and Trade-offs

### 1. In-Memory Cache vs Database

**Decision:** In-memory caching with MiniSearch indexing

**Reasoning:**

- Dataset is small (6K rows, ~2-3MB) - easily fits in memory
- No external database setup required for local development
- Fast search performance (sub-10ms response times)
- Simpler for reviewers to run locally

**Trade-offs:**

- Pros: Zero dependencies, fast, simple setup
- Cons: Not scalable beyond 50K products, data resets on restart, single-server only
- Migration path: For production with 100K+ products, would migrate to PostgreSQL or some other DB with full-text search indexes

### 2. Server Actions vs API Routes

**Decision:** Server Actions

**Reasoning:**

- Modern Next.js 14 App Router pattern
- Direct server function calls without HTTP overhead and close to components
- Type-safe end-to-end
- Data only needed by this application (not a public API)

**Trade-offs:**

- Pros: Simpler code, better performance, type safety
- Cons: Can't be consumed by external clients, would be difficult to scale at some point becuse of very thin layer between client and server side logic and structure limitations

### 3. MiniSearch vs Custom Search Logic

**Decision:** MiniSearch library

**Reasoning:**

- Battle-tested search algorithm with fuzzy matching
- Built-in indexing and autocomplete
- Small bundle size (~800 KB)
- Implementing fuzzy search, partial seach, auto suggestions

## Assumptions and Interpretations

**CSV Structure:**

- Assumed standard e-commerce product fields (title, decription, featured images, rating, etc)

**Search Scope:**

- Prioritized title and vendor matches over description for better relevance
- Assumed users search by product name, tags

## Architecture Overview

**Data Flow:**

```
CSV File
    ↓
Parse on first request
    ↓
In-memory cache
    ↓
MiniSearch index
    ↓
Server Actions (search, filter, sort)
    ↓
Client (infinite scroll UI)
```

**Rendering Strategy:**

- Server Components for initial page load (faster FCP)
- Client Components for interactive elements (search, filters)
- Server Actions for data operations

**Performance:**

- One-time CSV parsing on first request
- Debounced search (300ms) to reduce server calls
- Lazy loading with infinite scroll (20 products per batch)
- Pre-indexed search fields for fast queries

## Project Structure

```
src/
├── app/                      # Next.js pages
│   ├── page.tsx             # Main search page
│   └── layout.tsx
├── components/
│   ├── products/            # Product cards, list, sorting
│   ├── filters/             # Filter panel, accordions
│   ├── search/              # Search bar with suggestions
│   └── common/              # Reusable components
├── hooks/                   # Custom React hooks
│   ├── useInfiniteProducts.ts
│   ├── useProductFilters.ts
│   └── useSearchWithSuggestions.ts
├── lib/
│   ├── actions/             # Server Actions
│   │   ├── services/        # Data loading & caching
│   │   └── helpers/         # Search, filter, sort logic
│   └── helpers/             # Utility functions
└── types/                   # TypeScript definitions
```
