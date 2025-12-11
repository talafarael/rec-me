"use client";
import { ADMIN_PAGE } from "@/entities/admin/constants";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SideBar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[240px] border-r border-gray-200">
        <div className="h-full" />
      </div>
    );
  }

  return (
    <List className="w-[240px] border-r border-gray-200" suppressHydrationWarning>
      {ADMIN_PAGE.map((page) => {
        const isActive = pathname?.includes(page.path) || false;
        const fullPath = `/admin/${page.path}`;
        
        return (
          <ListItem key={page.path} disablePadding>
            <Link href={fullPath} className="w-full">
              <ListItemButton
                className={isActive ? "bg-white/20" : ""}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText 
                  primary={page.name}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 500 : 400,
                      color: "#fff",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};
