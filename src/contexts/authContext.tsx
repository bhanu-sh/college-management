"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  loggedin: boolean;
  avatar: string;
  setAvatar: (value: string) => void;
  setLoggedin: (value: boolean) => void;
  role: "Student" | "Staff" | "Admin";
  setRole: (value: "Student" | "Staff" | "Admin") => void;
  logout: () => void;
}>({
  loggedin: false,
  avatar: "",
  setAvatar: () => {},
  setLoggedin: () => {},
  role: "Student",
  setRole: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [role, setRole] = useState<"Student" | "Staff" | "Admin">("Student");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");
      setLoggedin(user !== null);
      setRole(user !== null ? JSON.parse(user).role : "Student");
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful!");
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("user");
      }
      setLoggedin(false);
      router.push("/");
    } catch (error: any) {
      console.error("Error logging out", error.message);
      toast.error("Logout failed.");
    }
  };

  // Render a loading message or component if necessary
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        avatar,
        setAvatar,
        loggedin,
        setLoggedin,
        role,
        setRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
