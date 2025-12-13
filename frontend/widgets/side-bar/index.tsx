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
    <div className="w-[30%] flex pt-[50px] justify-end border-r border-black">
      <List className="w-[204px]    mr-0px" suppressHydrationWarning>
        {ADMIN_PAGE.map((page) => {
          const isActive = pathname?.includes(page.path) || false;
          const fullPath = `/admin/${page.path}`;

          return (
            <ListItem key={page.path} disablePadding>
              <Link href={fullPath} className="w-full">
                <ListItemButton
                  className={isActive ? "bg-[black]  text-[white]" : ""}
                  sx={{
                    height: "35px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText
                    primary={page.name}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 500 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
