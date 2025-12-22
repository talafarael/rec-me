"use client";
import { Alert } from "@mui/material";
import { useLeadFormStore } from "@/entities/lead-form/store";

export const BookingError = () => {
  const { config } = useLeadFormStore();
  const fontColor = config?.osnovanie?.fontColor || "#FFFFFF";
  
  return (
    <Alert 
      severity="error"
      sx={{
        color: fontColor,
      }}
    >
      This is an error Alert.
    </Alert>
  );
};
