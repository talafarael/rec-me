"use client";

import { IAddressbook } from "@/features/seandpluse/types/adressbook";
import { Box } from "@mui/material";
import { AddressBookItem } from "../address-book-item";

export interface AddressBooksListProps {
  addressbooks: IAddressbook[];
}

export const AddressBooksList = ({ addressbooks }: AddressBooksListProps) => {
  return (
    <Box
      className="w-[100%]"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {addressbooks.map((addressbook, index) => (
        <AddressBookItem key={index} addressbook={addressbook} index={index} />
      ))}
    </Box>
  );
};
