import { SideBar } from "@/widgets/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] w-[100%]">
      <SideBar />
      {children}
    </div>
  );
}
