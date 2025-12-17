"use client";

import { useEffect, useState } from "react";

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkToken();

    // Listen for storage changes (e.g., token removal in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        checkToken();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // Show "not authorized" message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-xl font-semibold">Not authorized</p>
      </div>
    );
  }

  return <>{children}</>;
};
