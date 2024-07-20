"use client";

import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  loggedin: boolean;
  // fetchUserData: () => void;
  avatar: string;
  setAvatar: (value: string) => void;
  setLoggedin: (value: boolean) => void;
  role: "Student" | "Staff" | "Admin";
  setRole: (value: "Student" | "Staff" | "Admin") => void;
  logout: () => void;
}>({
  // fetchUserData: () => {},
  loggedin: false,
  avatar: "",
  setLoggedin: () => {},
  setAvatar: () => {},
  role: "Student",
  setRole: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedin, setLoggedin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const [role, setRole] = useState("user" as "Student" | "Staff" | "Admin");
  // const [route, setRoute] = useState("student");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedin(true);
    }
  }, []);


  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful!");
      localStorage.removeItem("user");
      setLoggedin(false);
      router.push("/");
    } catch (error: any) {
      console.error("Error getting user details", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // fetchUserData,
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
