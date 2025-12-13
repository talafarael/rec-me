"use client";

import { SideBar } from "@/widgets/side-bar";
import { useGetLeadConfig } from "@/features/lead-config/hooks/use-get-lead-config";
import { useGetNotifications } from "@/features/notifications-config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useGetLeadConfig();
  useGetNotifications();

  return (
    <div className="flex bg-[white] h-[100vh] w-[100%]">
      <SideBar />
      <div className="w-[72%] h-[100%]">{children}</div>
    </div>
  );
}
