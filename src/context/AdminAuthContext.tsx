import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
  updateAdminProfile: (name: string, email: string) => void;
  changeAdminPassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
}

/* ================= CONTEXT ================= */

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

export const AdminAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  /* ---------- LOGIN ---------- */
  const adminLogin = async (email: string, password: string) => {
    try {
      // 🔥 Mock API call (replace later)
      if (!email || !password) {
        throw new Error("Email and password required");
      }

      const mockAdmin: AdminUser = {
        id: "admin-1",
        name: "Admin",
        email,
      };

      setAdmin(mockAdmin);
    } catch (error) {
      console.error("Admin login failed:", error);
      throw error;
    }
  };

  /* ---------- LOGOUT ---------- */
  const adminLogout = () => {
    setAdmin(null);
  };

  /* ---------- UPDATE PROFILE ---------- */
  const updateAdminProfile = (name: string, email: string) => {
    if (!admin) return;

    setAdmin({
      ...admin,
      name,
      email,
    });
  };

  /* ---------- CHANGE PASSWORD ---------- */
  const changeAdminPassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      if (!oldPassword || !newPassword) {
        throw new Error("Passwords required");
      }

      // 🔥 Mock logic (replace with API)
      console.log("Password changed successfully");
    } catch (error) {
      console.error("Password change failed:", error);
      throw error;
    }
  };

  /* ---------- VALUE ---------- */
  const value: AdminAuthContextType = {
    admin,
    isAdminAuthenticated: !!admin,
    adminLogin,
    adminLogout,
    updateAdminProfile,
    changeAdminPassword,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used within AdminAuthProvider"
    );
  }

  return context;
};