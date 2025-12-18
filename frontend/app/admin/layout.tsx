"use client";

import { SideBar } from "@/widgets/side-bar";
import { useGetLeadConfig } from "@/features/lead-config/hooks/use-get-lead-config";
import { AdminProvider } from "@/shared/ui/admin-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useGetLeadConfig();

  return (
    <AdminProvider>
      <div className="flex bg-[white] h-[100vh] w-[100%]">
        <SideBar />
        <div className="w-[72%] h-100%">{children}</div>
      </div>
    </AdminProvider>
  );
}
