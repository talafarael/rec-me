"use client";
import { useLeadFormStore } from "@/entities/lead-form/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config } = useLeadFormStore();
  const backgroundColor = config?.osnovanie?.backgroundColor;
  const backgroundImage = config?.osnovanie?.backgroundImage;
  const useBackgroundImage = config?.osnovanie?.useBackgroundImage;
  
  const backgroundStyle: React.CSSProperties = {};
  if (useBackgroundImage && backgroundImage) {
    backgroundStyle.backgroundImage = `url(${backgroundImage})`;
    backgroundStyle.backgroundSize = "cover";
    backgroundStyle.backgroundPosition = "center";
    backgroundStyle.backgroundRepeat = "no-repeat";
  } else if (backgroundColor) {
    backgroundStyle.backgroundColor = backgroundColor;
  }

  return (
    <div 
      className="overflow-x-hidden m-[0px] h-[100vh]"
      style={backgroundStyle}
    >
      {children}
    </div>
  );
}
