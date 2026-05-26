// Skill verification question bank. Each entry: a question + 4 options + correct index.
// 6 supported skills × 3 difficulty tiers. The engine picks 5 random questions per attempt.

import type { Level } from "./auth-context";

export interface Question {
  q: string;
  options: string[];
  correct: number;
}

type Bank = Record<string, Record<Level, Question[]>>;

export const SKILLS = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "UI/UX",
  "Machine Learning",
] as const;

export type Skill = (typeof SKILLS)[number];

export const QUESTIONS: Bank = {
  React: {
    fresher: [
      { q: "What hook manages local state?", options: ["useEffect", "useState", "useMemo", "useRef"], correct: 1 },
      { q: "JSX is compiled to…", options: ["HTML strings", "React.createElement calls", "CSS", "Web Components"], correct: 1 },
      { q: "Props are…", options: ["Mutable", "Read-only", "Global", "Stateful"], correct: 1 },
      { q: "Key prop is needed when…", options: ["Routing", "Rendering lists", "Forms", "Context"], correct: 1 },
      { q: "Default export of React is…", options: ["A function", "An object", "A class", "A module namespace"], correct: 3 },
      { q: "useEffect runs…", options: ["Before render", "During render", "After commit", "Never"], correct: 2 },
      { q: "Fragment syntax is…", options: ["<></>", "<Fragment/>", "[[]]", "{{}}"], correct: 0 },
    ],
    intermediate: [
      { q: "useMemo prevents…", options: ["Re-render", "Recomputation of values", "State changes", "Mounts"], correct: 1 },
      { q: "Reconciliation uses…", options: ["DOM diff via keys", "Mutation observers", "Polling", "Hash check"], correct: 0 },
      { q: "Context is best for…", options: ["High-frequency state", "Theme/auth/global low-frequency state", "Forms", "Animations"], correct: 1 },
      { q: "useCallback returns…", options: ["A memoized value", "A memoized callback", "A ref", "A promise"], correct: 1 },
      { q: "Suspense is used for…", options: ["Errors", "Async boundaries", "Routing", "Animations"], correct: 1 },
      { q: "StrictMode does what?", options: ["Bans hooks", "Double-invokes for safety in dev", "Disables effects", "Enforces TS"], correct: 1 },
    ],
    professional: [
      { q: "Concurrent rendering enables…", options: ["Interruptible renders", "Web workers", "SSR only", "Atomic CSS"], correct: 0 },
      { q: "useTransition marks updates as…", options: ["Synchronous", "Non-urgent", "Critical", "Server-only"], correct: 1 },
      { q: "Server Components can…", options: ["Use useState", "Run on the server with zero JS", "Hydrate themselves", "Mount portals"], correct: 1 },
      { q: "Fiber's primary goal is…", options: ["GC tuning", "Incremental rendering", "CSS-in-JS", "Type safety"], correct: 1 },
      { q: "Avoid prop drilling with…", options: ["More refs", "Context/state libs", "Higher z-index", "Inline styles"], correct: 1 },
    ],
  },
  "Node.js": {
    fresher: [
      { q: "Node uses which engine?", options: ["SpiderMonkey", "V8", "JavaScriptCore", "Chakra"], correct: 1 },
      { q: "Module system default…", options: ["AMD", "CommonJS (historical) / ESM", "UMD", "SystemJS"], correct: 1 },
      { q: "Built-in HTTP module?", options: ["net", "http", "fetch", "url"], correct: 1 },
      { q: "package.json defines…", options: ["TS config", "Dependencies + scripts", "Routes", "Env"], correct: 1 },
      { q: "Async I/O is…", options: ["Blocking", "Non-blocking via event loop", "Multi-threaded only", "Disabled"], correct: 1 },
    ],
    intermediate: [
      { q: "Streams help with…", options: ["Bulk loads in RAM", "Backpressure & chunks", "Crypto", "Routing"], correct: 1 },
      { q: "Cluster module…", options: ["Forks workers per CPU", "Runs threads", "Pools DB", "Schedules cron"], correct: 0 },
      { q: "process.nextTick runs…", options: ["After I/O", "Before next event loop tick", "On exit", "Never"], correct: 1 },
      { q: "Best for CPU-bound work?", options: ["setTimeout", "worker_threads", "fs", "tls"], correct: 1 },
      { q: "Express middleware signature?", options: ["(req,res)", "(req,res,next)", "(ctx)", "(err)"], correct: 1 },
    ],
    professional: [
      { q: "AbortController with fetch lets you…", options: ["Cache", "Cancel in-flight requests", "Stream", "Retry"], correct: 1 },
      { q: "V8 hidden classes affect…", options: ["GC only", "Property access perf", "Bundling", "Linting"], correct: 1 },
      { q: "Avoid event loop blocking by…", options: ["Sync FS", "Long for-loops", "Offload heavy work to workers", "JSON.stringify huge objects on main"], correct: 2 },
    ],
  },
  Python: {
    fresher: [
      { q: "List comprehension creates a…", options: ["set", "dict", "list", "tuple"], correct: 2 },
      { q: "Immutable type?", options: ["list", "dict", "tuple", "set"], correct: 2 },
      { q: "PEP 8 is about…", options: ["Async", "Style", "Packaging", "Types"], correct: 1 },
      { q: "Run a script…", options: ["python file.py", "node file.py", "py.exec()", "java file"], correct: 0 },
      { q: "Virtual envs are managed by…", options: ["venv/pip", "npm", "cargo", "gem"], correct: 0 },
    ],
    intermediate: [
      { q: "GIL means…", options: ["Global Interpreter Lock", "Generic Iterator", "Garbage Init", "Global Import"], correct: 0 },
      { q: "Decorators are…", options: ["Type hints", "Functions wrapping functions", "Mixins", "Modules"], correct: 1 },
      { q: "asyncio runs…", options: ["Threads", "Coroutines on a loop", "Processes", "Cron"], correct: 1 },
    ],
    professional: [
      { q: "Best concurrency for CPU heavy?", options: ["threading", "asyncio", "multiprocessing", "selectors"], correct: 2 },
      { q: "Dataclasses provide…", options: ["ORM", "Auto __init__/__repr__", "Validation", "Networking"], correct: 1 },
    ],
  },
  Java: {
    fresher: [
      { q: "Class with main method must be…", options: ["public", "private", "protected", "static-only"], correct: 0 },
      { q: "JRE stands for…", options: ["Java Runtime Env", "Java Rapid Exec", "Just Run Engine", "JS Runtime"], correct: 0 },
      { q: "Primitive int size?", options: ["16 bits", "32 bits", "64 bits", "Platform-dependent"], correct: 1 },
      { q: "Strings are…", options: ["Mutable", "Immutable", "Pointers", "Arrays only"], correct: 1 },
      { q: "Build tool common?", options: ["Maven/Gradle", "Webpack", "Vite", "Bazel only"], correct: 0 },
    ],
    intermediate: [
      { q: "JVM heap holds…", options: ["Threads", "Objects", "Bytecode", "Class metadata"], correct: 1 },
      { q: "Generics are…", options: ["Runtime only", "Erased at compile", "JVM intrinsic", "Reflection-only"], correct: 1 },
      { q: "Streams API enables…", options: ["Reactive only", "Functional pipelines on collections", "Threads", "I/O only"], correct: 1 },
    ],
    professional: [
      { q: "Virtual threads (Project Loom) provide…", options: ["Native threads", "Lightweight scheduled threads", "Coroutines via async/await", "GPU offload"], correct: 1 },
      { q: "Best lock-free counter?", options: ["int", "AtomicInteger", "Long", "volatile int"], correct: 1 },
    ],
  },
  "UI/UX": {
    fresher: [
      { q: "Best contrast ratio for body text (WCAG AA)?", options: ["1.5:1", "3:1", "4.5:1", "7:1"], correct: 2 },
      { q: "Primary CTA per view?", options: ["0", "1", "3+", "Match links"], correct: 1 },
      { q: "Above the fold means…", options: ["Hidden", "Visible without scroll", "Sticky", "Footer"], correct: 1 },
      { q: "Tap target min size?", options: ["12px", "24px", "44px", "64px"], correct: 2 },
      { q: "Use of grids helps…", options: ["Randomness", "Alignment & rhythm", "Color", "Motion"], correct: 1 },
    ],
    intermediate: [
      { q: "Type scale ratio common?", options: ["1.05", "1.25", "2.0", "3.0"], correct: 1 },
      { q: "F-pattern describes…", options: ["Forms", "Scanning behavior on text", "Form validation", "Image grids"], correct: 1 },
      { q: "Motion should be…", options: ["Decorative", "Functional & subtle", "Random", "Always autoplay"], correct: 1 },
    ],
    professional: [
      { q: "Best practice for empty states?", options: ["Leave blank", "Explain + next action", "Hide page", "Show errors"], correct: 1 },
      { q: "Optical adjustment for icons?", options: ["Pixel-perfect grid only", "Adjust by eye", "Auto-align via CSS", "Use SVG only"], correct: 1 },
    ],
  },
  "Machine Learning": {
    fresher: [
      { q: "Supervised learning uses…", options: ["No labels", "Labels", "Rewards only", "Embeddings only"], correct: 1 },
      { q: "Train/test split prevents…", options: ["Overfitting eval", "Underfitting", "Bias", "Gradient blow up"], correct: 0 },
      { q: "Linear regression predicts…", options: ["Classes", "Continuous values", "Sequences", "Clusters"], correct: 1 },
      { q: "k-means is…", options: ["Supervised", "Unsupervised clustering", "RL", "Bayesian"], correct: 1 },
    ],
    intermediate: [
      { q: "ReLU activation outputs…", options: ["sigmoid", "max(0,x)", "tanh", "softmax"], correct: 1 },
      { q: "Dropout prevents…", options: ["Slow training", "Overfitting", "Vanishing gradient", "Quantization"], correct: 1 },
      { q: "Precision = …", options: ["TP/(TP+FN)", "TP/(TP+FP)", "TN/(TN+FP)", "F1"], correct: 1 },
    ],
    professional: [
      { q: "Transformers rely on…", options: ["Convolutions", "Self-attention", "Recurrence", "Pooling"], correct: 1 },
      { q: "LoRA fine-tunes by…", options: ["Full weights", "Low-rank adapters", "Pruning", "Quantizing"], correct: 1 },
    ],
  },
};

export function pickQuestions(skill: Skill, level: Level, n = 5): Question[] {
  const pool = QUESTIONS[skill]?.[level] ?? [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}
