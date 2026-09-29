import { ProjectCaseStudy } from "../types";

export const NOVALABSAI_CASE_STUDY: ProjectCaseStudy = {
  overview:
    "NovaLabsAI is an interactive agency platform and AI showcase designed for real-time physics interactions, fluid navigation, and responsive Next.js architectures. It presents complex AI workflows through an immersive, tactile visual medium.",
  challenge:
    "Building an interactive digital experience with multiple concurrent visual layers (3D particle fields, physics-driven mouse trails, spring transforms) often triggers severe main-thread jank, layout recalculation storms, and rapid battery drain on mobile devices, especially when combined with real-time AI token streaming.",
  solution:
    "Engineered a decoupled rendering pipeline. Offloaded all animation loops to GPU compositor threads using CSS transforms, isolated high-frequency mouse events to single RAF ticks, and containerized offscreen components with content-visibility: auto. Implemented an edge AI proxy route with backpressure streaming to deliver tokens immediately without blocking user interactions.",
  architectureHighlights: [
    "Zero-reflow IntersectionObserver viewport detection replacing legacy scroll event polling",
    "Edge-streamed AI pipeline delivering responses directly to the client with sub-150ms TTFT",
    "RAF lifecycle suspension when the tab is blurred or scrolled out of view, cutting idle GPU usage to 0%",
    "Hardware-accelerated scaleX and matrix transforms preserving a locked 60 FPS animation budget",
  ],
  diagram: {
    title: "NovaLabsAI Streaming & Motion Architecture",
    description: "High-throughput edge pipeline bridging real-time client physics with streaming AI inference",
    nodes: [
      {
        id: "client",
        label: "Client UI Layer",
        role: "Next.js 16 + Lenis + GPU Compositor",
        details: "Hardware-accelerated CSS animations and touch gesture physics engine",
        badge: "Frontend",
      },
      {
        id: "gateway",
        label: "AI Edge Gateway",
        role: "Next.js App Router Edge API",
        details: "Payload validation, rate-limiting, and Server-Sent Events (SSE) backpressure stream",
        badge: "Edge API",
      },
      {
        id: "inference",
        label: "Inference Engine",
        role: "LLM Orchestrator & Embeddings Cache",
        details: "Multi-model routing, prompt compilation, and vector semantic cache",
        badge: "AI Engine",
      },
      {
        id: "telemetry",
        label: "Realtime Telemetry",
        role: "Performance & Token Monitor",
        details: "Token accounting, latency logging, and error tracking",
        badge: "Observability",
      },
    ],
    connections: [
      { from: "client", to: "gateway", label: "User Prompts & Physics Gestures" },
      { from: "gateway", to: "inference", label: "Validated Stream Request" },
      { from: "inference", to: "gateway", label: "Token-by-Token SSE Stream" },
      { from: "gateway", to: "client", label: "Sub-150ms Stream Output" },
      { from: "gateway", to: "telemetry", label: "Latency & Usage Metrics" },
    ],
  },
  keyMetrics: [
    { label: "LIGHTHOUSE", value: "98+", description: "Near-perfect performance, SEO, accessibility, and best practices" },
    { label: "ANIMATION BUDGET", value: "60 FPS", description: "Locked framerate with zero dropped frames on mobile viewports" },
    { label: "STREAMING TTFT", value: "< 150ms", description: "Ultra-low time-to-first-token latency from the edge runtime" },
    { label: "GPU IDLE DRAIN", value: "0%", description: "Full animation teardown when scrolled past viewport or tab unfocused" },
  ],
  stackBreakdown: [
    { category: "Frontend Core", technologies: ["Next.js 16 (App Router)", "React 19", "TypeScript 5", "Tailwind CSS v4"] },
    { category: "Motion & Physics", technologies: ["Framer Motion", "Lenis Smooth Scroll", "Canvas 2D Particles", "CSS Compositor Keyframes"] },
    { category: "AI & Backend", technologies: ["Edge Streaming API", "OpenAI & Anthropic SDKs", "Zod Schema Validation", "Server-Sent Events (SSE)"] },
    { category: "Deployment", technologies: ["Vercel Edge Network", "Turbopack Compilation", "Lighthouse CI"] },
  ],
  engineeringLearnings: [
    "Separating high-frequency user gesture tracking from React component state prevents unnecessary subtree re-renders.",
    "CSS GPU layer promotion via will-change and translateZ(0) significantly outperforms JavaScript animation loops for continuous ambient effects.",
    "Streaming tokens incrementally through Server-Sent Events improves perceived user latency by over 80% compared to buffering responses.",
  ],
};

export const KLICKONN_CASE_STUDY: ProjectCaseStudy = {
  overview:
    "Klickonn is a full-stack media SaaS and publishing platform built to handle high-frequency digital content management, instant asset optimization, and complex relational publishing workflows with zero database connection exhaustion.",
  challenge:
    "Traditional serverless backend routes running in ephemeral lambdas quickly exhaust relational database connection pools under concurrent traffic spikes. Additionally, unoptimized image uploads directly to cloud storage lead to high egress costs, slow mobile load times, and poor Core Web Vitals (LCP/CLS).",
  solution:
    "Engineered a serverless relational data pipeline using Neon Postgres with connection pooling and Drizzle ORM for type-safe queries. Integrated an automated ImageKit processing pipeline with client-side presigned direct uploads, on-the-fly WebP/AVIF transcoding, and edge CDN distribution.",
  architectureHighlights: [
    "Serverless connection pooling via pgBouncer maintaining sub-25ms relational queries with zero connection starvation",
    "Direct-to-CDN presigned upload flow eliminating server-side file buffering bottlenecks",
    "Automated responsive media variants and Low Quality Image Placeholders (LQIP) eliminating layout shift (CLS < 0.01)",
    "Fully typed schema contracts generated via Drizzle ORM with atomic transaction safety",
  ],
  diagram: {
    title: "Klickonn Serverless Publishing Pipeline",
    description: "High-efficiency media SaaS flow combining serverless PostgreSQL pooling with automated asset transcoding",
    nodes: [
      {
        id: "client",
        label: "SaaS Client",
        role: "Next.js ISR / SSR Application",
        details: "Optimistic UI updates, media drag-and-drop, and dashboard analytics",
        badge: "Web App",
      },
      {
        id: "edge_api",
        label: "Edge API Routes",
        role: "Next.js App Router API & Auth",
        details: "Session verification, presigned URL generation, and payload validation",
        badge: "API & Auth",
      },
      {
        id: "orm_pool",
        label: "Drizzle ORM + Pooler",
        role: "Connection Pool Manager",
        details: "pgBouncer connection pooling and prepared statement caching",
        badge: "ORM Layer",
      },
      {
        id: "db",
        label: "Neon Serverless DB",
        role: "PostgreSQL Relational Storage",
        details: "Autoscaling compute, branching, and index-optimized relational queries",
        badge: "Database",
      },
      {
        id: "imagekit",
        label: "ImageKit CDN Engine",
        role: "Automated Media Transformation",
        details: "On-the-fly WebP/AVIF generation, watermarking, and global edge delivery",
        badge: "Media CDN",
      },
    ],
    connections: [
      { from: "client", to: "edge_api", label: "Authenticated Mutation & Upload Request" },
      { from: "edge_api", to: "orm_pool", label: "Type-Safe Relational Queries" },
      { from: "orm_pool", to: "db", label: "Pooled SQL Execution (< 25ms)" },
      { from: "edge_api", to: "imagekit", label: "Presigned Token & Transformation Rules" },
      { from: "client", to: "imagekit", label: "Direct Binary Upload & Optimized Stream" },
    ],
  },
  keyMetrics: [
    { label: "DATABASE QUERY", value: "< 25ms", description: "Average indexed query response time through pooled Neon PostgreSQL" },
    { label: "MEDIA PIPELINE", value: "0.78s", description: "Upload-to-CDN delivery latency with automatic WebP/AVIF transcoding" },
    { label: "API UPTIME", value: "99.98%", description: "Resilient serverless architecture with automatic failover and scaling" },
    { label: "CLS SHIFT", value: "< 0.01", description: "Zero cumulative layout shift achieved through intrinsic aspect ratio reserves" },
  ],
  stackBreakdown: [
    { category: "Frontend & App", technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
    { category: "Database & ORM", technologies: ["Neon Serverless Postgres", "Drizzle ORM", "pgBouncer Connection Pooler", "PostgreSQL 16"] },
    { category: "Media & CDN", technologies: ["ImageKit.io API", "Global CDN Caching", "WebP/AVIF Compression", "Direct Presigned Uploads"] },
    { category: "Security & Auth", technologies: ["NextAuth / JWT Session Management", "Zod Input Sanitation", "CSRF Tokens"] },
  ],
  engineeringLearnings: [
    "Direct-to-CDN presigned uploads bypass server memory constraints entirely, reducing API CPU consumption by 90%.",
    "Drizzle ORM combines the developer experience of an ORM with the raw execution speed and predictable SQL generation of a query builder.",
    "Generating Low Quality Image Placeholders (LQIP) and reserving intrinsic aspect ratios prevents layout shift during high-resolution media loading.",
  ],
};
