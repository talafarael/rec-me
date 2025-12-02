"use client";
import { CircularProgress } from "@mui/material";
import { amber } from "@mui/material/colors";

export const BookingLoading = () => {
  return <CircularProgress sx={{ color: amber[500], width: 40, height: 40 }} />;
};
