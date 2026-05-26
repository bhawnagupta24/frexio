// Seed data so the platform looks alive on first load.
import type { Level } from "./auth-context";

export interface Job {
  id: string;
  title: string;
  client: string;
  clientAvatar: string;
  budget: number;
  level: Level;
  category: string;
  skills: string[];
  description: string;
  postedAt: number;
  proposals: number;
  remote: boolean;
  type: "job" | "trial";
  duration: string;
}

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  level: Level;
  trustScore: number;
  skills: string[];
  rate: number;
  completed: number;
  rating: number;
  avatar: string;
  verified: boolean;
  bio: string;
  earnings: number;
}

export interface Thread {
  id: string;
  with: { name: string; avatar: string; online: boolean };
  lastMessage: string;
  lastAt: number;
  unread: number;
}

export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  at: number;
  seen: boolean;
}

export interface NotificationItem {
  id: string;
  kind: "job" | "trial" | "payment" | "meeting" | "badge" | "message";
  title: string;
  body: string;
  at: number;
  read: boolean;
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;
const avatarP = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=0ea5e9,8b5cf6,3b82f6`;

export const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "Build a React landing page with animations",
    client: "Aurora Labs",
    clientAvatar: avatar("Aurora Labs"),
    budget: 18000,
    level: "intermediate",
    category: "Web Development",
    skills: ["React", "Tailwind", "Framer Motion"],
    description:
      "We need a beautiful conversion-optimized landing page. Glassmorphism, dark mode, scroll animations. 1 week.",
    postedAt: Date.now() - 1000 * 60 * 60 * 3,
    proposals: 12,
    remote: true,
    type: "job",
    duration: "1 week",
  },
  {
    id: "j2",
    title: "Trial: Implement login + signup screens",
    client: "Northwind",
    clientAvatar: avatar("Northwind"),
    budget: 2500,
    level: "fresher",
    category: "Frontend",
    skills: ["React", "Forms", "Tailwind"],
    description:
      "Short paid trial. Build pixel-perfect auth screens from Figma. Selected freelancer joins full project.",
    postedAt: Date.now() - 1000 * 60 * 60 * 8,
    proposals: 24,
    remote: true,
    type: "trial",
    duration: "2 days",
  },
  {
    id: "j3",
    title: "Build internal admin dashboard (Node + React)",
    client: "Helios Corp",
    clientAvatar: avatar("Helios Corp"),
    budget: 85000,
    level: "professional",
    category: "Full Stack",
    skills: ["React", "Node.js", "PostgreSQL", "Auth"],
    description:
      "Long-term contract. Admin tooling with RBAC, audit logs, analytics. Senior engineer preferred.",
    postedAt: Date.now() - 1000 * 60 * 60 * 24,
    proposals: 7,
    remote: true,
    type: "job",
    duration: "3 months",
  },
  {
    id: "j4",
    title: "ML model for product recommendations",
    client: "Kindred",
    clientAvatar: avatar("Kindred"),
    budget: 65000,
    level: "professional",
    category: "Machine Learning",
    skills: ["Python", "PyTorch", "Recommender Systems"],
    description:
      "Build a hybrid recommender. Real dataset provided. Deliverable: model + REST endpoint.",
    postedAt: Date.now() - 1000 * 60 * 60 * 30,
    proposals: 9,
    remote: true,
    type: "job",
    duration: "6 weeks",
  },
  {
    id: "j5",
    title: "Trial: Design a pricing page (Figma)",
    client: "Quill",
    clientAvatar: avatar("Quill"),
    budget: 1800,
    level: "fresher",
    category: "UI/UX",
    skills: ["Figma", "UI/UX", "Web Design"],
    description: "Quick paid trial. Best entry gets the full website redesign.",
    postedAt: Date.now() - 1000 * 60 * 60 * 12,
    proposals: 31,
    remote: true,
    type: "trial",
    duration: "3 days",
  },
  {
    id: "j6",
    title: "API endpoints for mobile app (Node.js)",
    client: "Voyage",
    clientAvatar: avatar("Voyage"),
    budget: 32000,
    level: "intermediate",
    category: "Backend",
    skills: ["Node.js", "REST", "MongoDB"],
    description: "Build 12 REST endpoints with tests and OpenAPI docs.",
    postedAt: Date.now() - 1000 * 60 * 60 * 18,
    proposals: 15,
    remote: true,
    type: "job",
    duration: "2 weeks",
  },
  {
    id: "j7",
    title: "Java microservice for payments",
    client: "Bastion Bank",
    clientAvatar: avatar("Bastion Bank"),
    budget: 120000,
    level: "professional",
    category: "Backend",
    skills: ["Java", "Spring", "Kafka"],
    description: "Production-grade microservice. Strict SLAs. Verified pros only.",
    postedAt: Date.now() - 1000 * 60 * 60 * 48,
    proposals: 4,
    remote: false,
    type: "job",
    duration: "8 weeks",
  },
  {
    id: "j8",
    title: "Trial: Build a working contact form",
    client: "Lumen",
    clientAvatar: avatar("Lumen"),
    budget: 1200,
    level: "fresher",
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript"],
    description: "Beginner-friendly task. Mentorship included.",
    postedAt: Date.now() - 1000 * 60 * 60 * 6,
    proposals: 47,
    remote: true,
    type: "trial",
    duration: "1 day",
  },
];

export const MOCK_FREELANCERS: Freelancer[] = [
  {
    id: "f1",
    name: "Ananya Rao",
    title: "Senior Frontend Engineer",
    level: "professional",
    trustScore: 96,
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    rate: 4500,
    completed: 87,
    rating: 4.9,
    avatar: avatarP("Ananya Rao"),
    verified: true,
    bio: "8 yrs building shipped product. Former Razorpay, Atlassian.",
    earnings: 1840000,
  },
  {
    id: "f2",
    name: "Kabir Sharma",
    title: "Full-stack Developer",
    level: "intermediate",
    trustScore: 84,
    skills: ["Node.js", "React", "PostgreSQL"],
    rate: 2200,
    completed: 34,
    rating: 4.7,
    avatar: avatarP("Kabir Sharma"),
    verified: true,
    bio: "3 yrs. Fast shipper. Loves SaaS dashboards.",
    earnings: 420000,
  },
  {
    id: "f3",
    name: "Priya Menon",
    title: "Product Designer",
    level: "professional",
    trustScore: 92,
    skills: ["UI/UX", "Figma", "Design Systems"],
    rate: 3800,
    completed: 61,
    rating: 4.9,
    avatar: avatarP("Priya Menon"),
    verified: true,
    bio: "Brand & product systems. Worked with Zerodha, Cred.",
    earnings: 980000,
  },
  {
    id: "f4",
    name: "Rohan Iyer",
    title: "ML Engineer",
    level: "professional",
    trustScore: 90,
    skills: ["Python", "PyTorch", "MLOps"],
    rate: 4200,
    completed: 22,
    rating: 4.8,
    avatar: avatarP("Rohan Iyer"),
    verified: true,
    bio: "Deep learning + recommender systems. IIT Bombay.",
    earnings: 720000,
  },
  {
    id: "f5",
    name: "Meera Joshi",
    title: "Frontend Developer (Junior)",
    level: "fresher",
    trustScore: 71,
    skills: ["React", "Tailwind", "HTML/CSS"],
    rate: 700,
    completed: 6,
    rating: 4.6,
    avatar: avatarP("Meera Joshi"),
    verified: true,
    bio: "Career switcher. Hungry for trials & internships.",
    earnings: 26000,
  },
  {
    id: "f6",
    name: "Dev Patel",
    title: "Backend Developer",
    level: "intermediate",
    trustScore: 81,
    skills: ["Node.js", "GraphQL", "AWS"],
    rate: 2400,
    completed: 41,
    rating: 4.7,
    avatar: avatarP("Dev Patel"),
    verified: true,
    bio: "Builds APIs that don't fall over.",
    earnings: 510000,
  },
  {
    id: "f7",
    name: "Sara Khan",
    title: "UI Designer (Junior)",
    level: "fresher",
    trustScore: 68,
    skills: ["Figma", "UI/UX"],
    rate: 600,
    completed: 4,
    rating: 4.5,
    avatar: avatarP("Sara Khan"),
    verified: false,
    bio: "Pixel-perfect, looking for first big break.",
    earnings: 14000,
  },
  {
    id: "f8",
    name: "Vikram Singh",
    title: "Java Engineer",
    level: "professional",
    trustScore: 94,
    skills: ["Java", "Spring", "Kafka"],
    rate: 5000,
    completed: 53,
    rating: 4.9,
    avatar: avatarP("Vikram Singh"),
    verified: true,
    bio: "Banking & fintech backends. 10 yrs.",
    earnings: 2100000,
  },
];

export const MOCK_THREADS: Thread[] = [
  {
    id: "t1",
    with: { name: "Aurora Labs", avatar: avatar("Aurora Labs"), online: true },
    lastMessage: "Sounds good — let's lock the scope.",
    lastAt: Date.now() - 1000 * 60 * 4,
    unread: 2,
  },
  {
    id: "t2",
    with: { name: "Ananya Rao", avatar: avatarP("Ananya Rao"), online: true },
    lastMessage: "Pushed v2 — review when you can ✨",
    lastAt: Date.now() - 1000 * 60 * 22,
    unread: 0,
  },
  {
    id: "t3",
    with: { name: "Helios Corp", avatar: avatar("Helios Corp"), online: false },
    lastMessage: "We released the milestone payment.",
    lastAt: Date.now() - 1000 * 60 * 60 * 2,
    unread: 0,
  },
  {
    id: "t4",
    with: { name: "Priya Menon", avatar: avatarP("Priya Menon"), online: false },
    lastMessage: "Sending the Figma file shortly.",
    lastAt: Date.now() - 1000 * 60 * 60 * 5,
    unread: 1,
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  t1: [
    { id: "m1", from: "them", text: "Hey! Saw your profile, loved the work.", at: Date.now() - 1000 * 60 * 30, seen: true },
    { id: "m2", from: "me", text: "Thanks! Happy to dig in. What's the timeline?", at: Date.now() - 1000 * 60 * 28, seen: true },
    { id: "m3", from: "them", text: "1 week. Figma's locked, copy is ready.", at: Date.now() - 1000 * 60 * 10, seen: true },
    { id: "m4", from: "them", text: "Sounds good — let's lock the scope.", at: Date.now() - 1000 * 60 * 4, seen: false },
  ],
  t2: [
    { id: "m1", from: "them", text: "Pushed v2 — review when you can ✨", at: Date.now() - 1000 * 60 * 22, seen: true },
  ],
  t3: [
    { id: "m1", from: "them", text: "We released the milestone payment.", at: Date.now() - 1000 * 60 * 60 * 2, seen: true },
  ],
  t4: [
    { id: "m1", from: "them", text: "Sending the Figma file shortly.", at: Date.now() - 1000 * 60 * 60 * 5, seen: false },
  ],
};

export const MOCK_NOTIFS: NotificationItem[] = [
  { id: "n1", kind: "job", title: "New job match", body: "98% match on 'React landing page'", at: Date.now() - 1000 * 60 * 5, read: false },
  { id: "n2", kind: "payment", title: "Payment released", body: "₹85,000 released by Helios Corp", at: Date.now() - 1000 * 60 * 60 * 2, read: false },
  { id: "n3", kind: "badge", title: "Badge unlocked", body: "You earned the 14-day streak badge", at: Date.now() - 1000 * 60 * 60 * 6, read: true },
  { id: "n4", kind: "meeting", title: "Interview scheduled", body: "Aurora Labs · Tomorrow 4:00 PM", at: Date.now() - 1000 * 60 * 60 * 9, read: true },
  { id: "n5", kind: "trial", title: "Trial approved", body: "Quill marked your submission as approved", at: Date.now() - 1000 * 60 * 60 * 24, read: true },
];

export const TYPING_PARAGRAPHS = [
  "The future of work is fluid. Talent moves where great problems live, and the best teams form around shared standards of craft, speed, and trust.",
  "A productive day starts with a clear intent. Pick the one thing that, if done, would make every other task easier or unnecessary, and ship it before noon.",
  "Software is leverage. Every well-named function, every honest comment, every refusal to ship sloppy code adds compounding value to the systems we depend on.",
  "Curiosity is the only renewable engineering skill. Tools change every year, but the engineer who keeps asking better questions keeps shipping better answers.",
];

// AI match score between a freelancer and a job (mock heuristic, deterministic-ish)
export function matchScore(freelancer: Freelancer, job: Job): number {
  const skillOverlap = job.skills.filter((s) =>
    freelancer.skills.some((fs) => fs.toLowerCase() === s.toLowerCase()),
  ).length;
  const skillRatio = job.skills.length ? skillOverlap / job.skills.length : 0;
  const levelMatch = freelancer.level === job.level ? 1 : freelancer.level === "professional" ? 0.8 : 0.55;
  const trust = freelancer.trustScore / 100;
  const raw = skillRatio * 60 + levelMatch * 25 + trust * 15;
  return Math.min(99, Math.round(raw));
}

// 52-week activity heatmap data (mock)
export function activityData(seed = 42): { date: Date; count: number }[] {
  const days: { date: Date; count: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let s = seed;
  const rng = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dow = d.getDay();
    const base = dow === 0 || dow === 6 ? 0.35 : 0.75;
    const r = rng();
    const count = r < 1 - base ? 0 : Math.floor(rng() * 6);
    days.push({ date: d, count });
  }
  return days;
}

// Typing scores in localStorage
export interface TypingScore {
  id: string;
  wpm: number;
  accuracy: number;
  at: number;
}
const TYPING_KEY = "nexum.typing.scores";
export function loadTypingScores(): TypingScore[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(TYPING_KEY) || "[]"); } catch { return []; }
}
export function saveTypingScore(s: TypingScore) {
  if (typeof window === "undefined") return;
  const all = loadTypingScores();
  all.unshift(s);
  localStorage.setItem(TYPING_KEY, JSON.stringify(all.slice(0, 100)));
}
export function deleteTypingScore(id: string) {
  if (typeof window === "undefined") return;
  const all = loadTypingScores().filter((s) => s.id !== id);
  localStorage.setItem(TYPING_KEY, JSON.stringify(all));
}
export function clearTypingScores() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TYPING_KEY);
}

export const LEADERBOARD = [
  { id: "l1", name: "Ananya Rao", avatar: avatarP("Ananya Rao"), wpm: 132, accuracy: 98.4, badges: 12 },
  { id: "l2", name: "Vikram Singh", avatar: avatarP("Vikram Singh"), wpm: 124, accuracy: 97.9, badges: 9 },
  { id: "l3", name: "Priya Menon", avatar: avatarP("Priya Menon"), wpm: 118, accuracy: 98.0, badges: 11 },
  { id: "l4", name: "Rohan Iyer", avatar: avatarP("Rohan Iyer"), wpm: 112, accuracy: 96.7, badges: 7 },
  { id: "l5", name: "Kabir Sharma", avatar: avatarP("Kabir Sharma"), wpm: 105, accuracy: 96.0, badges: 5 },
  { id: "l6", name: "Dev Patel", avatar: avatarP("Dev Patel"), wpm: 101, accuracy: 95.5, badges: 4 },
];
