"use client";
import { CircularProgress } from "@mui/material";
import { amber } from "@mui/material/colors";

export const BookingLoading = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <CircularProgress sx={{ color: amber[500], width: 40, height: 40 }} />;
    </div>
  );
};
