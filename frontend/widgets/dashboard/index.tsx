"use client";

import { useGetAddressbooks } from "@/features/seandpluse/hooks/get-adressbooks";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import { AddressBooksList } from "@/entities/seandpluse/ui/address-books-list";

export const Dashboard = () => {
  const { addressbooks, error, loading } = useGetAddressbooks();

  if (loading) {
    return (
      <Box
        className="w-[100%] flex justify-center items-center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} className="w-[100%] flex justify-center items-center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!addressbooks || addressbooks.length === 0) {
    return (
      <Box p={3} className="w-[100%] flex justify-center items-center">
        <Alert severity="info">No address books found</Alert>
      </Box>
    );
  }

  return (
    <Box p={3} className="w-[100%]">
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Address Books
      </Typography>
      <AddressBooksList addressbooks={addressbooks} />
    </Box>
  );
};
