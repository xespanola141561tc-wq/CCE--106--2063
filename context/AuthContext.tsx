import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SESSION_KEY = "eventmate.student-session";

export type Student = {
  name: string;
  email: string;
  studentId: string;
};

type AuthContextValue = {
  student: Student | null;
  token: string | null;
  isRestoring: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function studentNameFromEmail(email: string) {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const savedSession = await SecureStore.getItemAsync(SESSION_KEY);
        if (savedSession) {
          const session = JSON.parse(savedSession) as { token: string; student: Student; expiresAt: number };
          if (session.expiresAt <= Date.now()) {
            await SecureStore.deleteItemAsync(SESSION_KEY);
          } else {
            setToken(session.token);
            setStudent(session.student);
          }
        }
      } catch {
        // A missing or invalid saved session is treated as signed out.
        await SecureStore.deleteItemAsync(SESSION_KEY).catch(() => undefined);
      } finally {
        setIsRestoring(false);
      }
    }

    restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      student,
      token,
      isRestoring,
      async signIn(email, password) {
        // Replace this demo check with your school's API call when one is available.
        if (email.toLowerCase() !== "student@campus.edu" || password !== "campus123") {
          throw new Error("Invalid email or password. Try student@campus.edu / campus123.");
        }

        const nextStudent: Student = {
          name: "Campus Student",
          email: email.toLowerCase(),
          studentId: "CCE-106-2063",
        };
        const nextToken = `student-session-${Date.now()}`;
        await SecureStore.setItemAsync(
          SESSION_KEY,
          JSON.stringify({
            token: nextToken,
            student: nextStudent,
            // A real API normally supplies this expiry with its access token.
            expiresAt: Date.now() + 8 * 60 * 60 * 1000,
          }),
        );
        setStudent(nextStudent);
        setToken(nextToken);
      },
      async signOut() {
        await SecureStore.deleteItemAsync(SESSION_KEY);
        setStudent(null);
        setToken(null);
      },
    }),
    [isRestoring, student, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
