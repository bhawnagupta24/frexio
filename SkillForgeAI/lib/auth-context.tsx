import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { firebaseConfigured, getFirebase } from "./firebase";

export type Role = "freelancer" | "client" | "admin";
export type Level = "fresher" | "intermediate" | "professional";
export type OnboardingStage =
  | "role"
  | "profile"
  | "aadhaar"
  | "skill-test"
  | "done";

export interface NexumUser {
  uid: string;
  email: string;
  name: string;
  role: Role | null;
  level: Level;
  skills: string[];
  photoUrl?: string;
  verified: boolean;
  aadhaarVerified: boolean;
  onboardingStage: OnboardingStage;
  trustScore: number;
  streak: number;
  completedProjects: number;
  earnings: number;
  createdAt: number;
}

interface AuthState {
  user: NexumUser | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInDemo: (role: Role) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<NexumUser>) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = "nexum.mock.user";

function loadMock(): NexumUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NexumUser) : null;
  } catch {
    return null;
  }
}

function saveMock(u: NexumUser | null) {
  if (typeof window === "undefined") return;
  if (!u) localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}

function defaultUser(email: string, name: string): NexumUser {
  return {
    uid: "u_" + Math.random().toString(36).slice(2, 10),
    email,
    name,
    role: null,
    level: "fresher",
    skills: [],
    verified: false,
    aadhaarVerified: false,
    onboardingStage: "role",
    trustScore: 64,
    streak: 0,
    completedProjects: 0,
    earnings: 0,
    createdAt: Date.now(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<NexumUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock mode hydration
    if (!firebaseConfigured) {
      setUser(loadMock());
      setLoading(false);
      return;
    }
    // Firebase live mode
    const fb = getFirebase();
    if (!fb) {
      setLoading(false);
      return;
    }
    let unsub = () => {};
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { doc, getDoc, setDoc } = await import("firebase/firestore");
      unsub = onAuthStateChanged(fb.auth, async (fbUser) => {
        if (!fbUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        const ref = doc(fb.db, "users", fbUser.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          const next = defaultUser(
            fbUser.email ?? "",
            fbUser.displayName ?? "Nexum user",
          );
          next.uid = fbUser.uid;
          await setDoc(ref, next);
          setUser(next);
        } else {
          setUser(snap.data() as NexumUser);
        }
        setLoading(false);
      });
    })();
    return () => unsub();
  }, []);

  const api = useMemo<AuthState>(
    () => ({
      user,
      loading,
      async signUp(email, password, name) {
        if (!firebaseConfigured) {
          const u = defaultUser(email, name);
          saveMock(u);
          setUser(u);
          return;
        }
        const fb = getFirebase()!;
        const { createUserWithEmailAndPassword, updateProfile } = await import(
          "firebase/auth"
        );
        const cred = await createUserWithEmailAndPassword(
          fb.auth,
          email,
          password,
        );
        await updateProfile(cred.user, { displayName: name });
      },
      async signIn(email, password) {
        if (!firebaseConfigured) {
          let u = loadMock();
          if (!u || u.email !== email) u = defaultUser(email, "Nexum user");
          saveMock(u);
          setUser(u);
          return;
        }
        const fb = getFirebase()!;
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        await signInWithEmailAndPassword(fb.auth, email, password);
      },
      async signInDemo(role) {
        const u = defaultUser(
          role === "client" ? "demo.client@nexum.ai" : "demo.dev@nexum.ai",
          role === "client" ? "Demo Client" : "Demo Freelancer",
        );
        u.role = role;
        u.onboardingStage = role === "client" ? "done" : "done";
        u.verified = true;
        u.aadhaarVerified = true;
        u.level = "intermediate";
        u.skills =
          role === "freelancer"
            ? ["React", "Node.js", "TypeScript", "UI/UX"]
            : [];
        u.trustScore = 88;
        u.streak = 14;
        u.completedProjects = role === "freelancer" ? 23 : 0;
        u.earnings = role === "freelancer" ? 184000 : 0;
        saveMock(u);
        setUser(u);
      },
      async signOut() {
        if (!firebaseConfigured) {
          saveMock(null);
          setUser(null);
          return;
        }
        const fb = getFirebase()!;
        const { signOut } = await import("firebase/auth");
        await signOut(fb.auth);
      },
      async updateUser(patch) {
        if (!user) return;
        const next = { ...user, ...patch };
        if (!firebaseConfigured) {
          saveMock(next);
          setUser(next);
          return;
        }
        const fb = getFirebase()!;
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(fb.db, "users", user.uid), next, { merge: true });
        setUser(next);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
