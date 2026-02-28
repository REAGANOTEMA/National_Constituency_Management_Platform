import React, { createContext, useContext, useState, ReactNode } from "react";
import type { UserRole } from "@/data/ugandaData";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  constituency?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  "admin@ncmp.go.ug": {
    id: "1",
    name: "H.E. Yoweri K. Museveni",
    email: "admin@ncmp.go.ug",
    role: "super_admin",
    constituency: "All Uganda",
  },
  "mp@ncmp.go.ug": {
    id: "2",
    name: "Hon. Muhammad Nsereko",
    email: "mp@ncmp.go.ug",
    role: "mp",
    constituency: "Kampala Central",
  },
  "staff@ncmp.go.ug": {
    id: "3",
    name: "Sarah Nakimera",
    email: "staff@ncmp.go.ug",
    role: "staff",
    constituency: "Kampala Central",
  },
  "citizen@ncmp.go.ug": {
    id: "4",
    name: "John Ochieng",
    email: "citizen@ncmp.go.ug",
    role: "citizen",
    constituency: "Kampala Central",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Demo login - in production connect to Supabase/backend
    const foundUser = DEMO_USERS[email];
    if (foundUser && password.length >= 4) {
      setUser(foundUser);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
