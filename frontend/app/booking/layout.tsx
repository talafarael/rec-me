export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" overflow-x-hidden m-[0px] bg-main h-[100vh] ">
      {children}
    </div>
  );
}
