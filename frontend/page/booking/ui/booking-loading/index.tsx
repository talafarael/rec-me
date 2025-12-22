"use client";
import { CircularProgress } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useLeadFormStore } from "@/entities/lead-form/store";

export const BookingLoading = () => {
  const { config } = useLeadFormStore();
  const primaryColor = config?.osnovanie?.primaryColor || amber[500];
  
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <CircularProgress sx={{ color: primaryColor, width: 40, height: 40 }} />;
    </div>
  );
};
