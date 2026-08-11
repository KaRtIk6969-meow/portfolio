# Architecture

## Architecture Goals

The architecture should be:
* maintainable
* understandable
* scalable according to project constraints
* high performance, search engine optimization friendly, clean structure

Avoid unnecessary complexity.

---

# System Overview

User Browser → Next.js Static Pages → Local JSON Data Objects

---

# Tech Stack

## Frontend
* Framework: Next.js with React 19 and TypeScript
* Styling: Tailwind CSS with CSS variables
* State Management: standard React hooks (useState, Context)
* Animation: Framer Motion
* Scroll Management: Lenis Smooth Scroll

## Backend / API
* Framework: Next.js API Routes (if needed)
* Database: local static JSON data objects (no external database required)
* ORM/Query Builder: none

## Infrastructure
* Hosting: Vercel or similar platform
* Deployment: Git integration continuous deployment

---

# Folder Structure

```
src/
  pages/
  features/
    hero/
      ui/
      hooks/
    projects/
      ui/
      hooks/
    skills/
      ui/
      hooks/
    about/
      ui/
      hooks/
    contact/
      ui/
      hooks/
  shared/
    components/
    hooks/
    layouts/
    utils/
```

Each feature module must own its own:
* components
* hooks
* services
* types

Avoid giant shared folders. Maintain a strict Feature-Based Architecture.

---

# State Management Rules

Use standard React hooks (useState, Context).

Do NOT use legacy or unnecessarily complex patterns unless explicitly required.
Keep stores focused. Avoid monolithic state objects.

---

# Data Fetching & Caching

Use static imports or client-side fetch for local JSON files.

Responsibilities:
* caching
* invalidation
* async operations

Do not misuse UI state managers for server-state patterns.

---

# Authentication

Provider: none

Methods:
none

Authentication state must remain isolated from general application state.

---

# Core Workflows

## Workflow 1: Page Navigation
User clicks navigation links → Lenis scrolls viewport smoothly to target element.

## Workflow 2: Contact Form Submission
User enters message → client performs validation → request triggers internal API endpoint → success panel displays feedback.

---

# Performance Rules

Use:
* next/image component for images
* framer motion layout transitions

Avoid:
* unnecessary re-renders
* unoptimized assets
* layout shifting during mount

---

# Future Expansion & Scalability

The structure supports easily swapping the static JSON data files for an external Content Management System or adding a database for direct contact form storage.
