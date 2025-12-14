export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" overflow-x-hidden bg-main h-[100vh] ">{children}</div>
  );
}
