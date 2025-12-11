"use client";

import { useGetLeadConfig } from "@/features/lead-config/hooks/use-get-lead-config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useGetLeadConfig();
  return <div className="w-[100%] h-[100%] bg-[white]"> {children}</div>;
}
