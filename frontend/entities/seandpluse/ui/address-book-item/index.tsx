"use client";

import { IAddressbook } from "@/features/seandpluse/types/adressbook";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

export interface AddressBookItemProps {
  addressbook: IAddressbook;
  index: number;
}

export const AddressBookItem = ({
  addressbook,
  index,
}: AddressBookItemProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
          <Typography variant="subtitle2" component="div" sx={{ fontSize: "0.875rem" }}>
            Contact #{index + 1}
          </Typography>
          <Chip
            label={addressbook.status_explain}
            color={addressbook.status === 1 ? "success" : "default"}
            size="small"
            sx={{ height: "20px", fontSize: "0.7rem" }}
          />
        </Box>

        <Box mb={1}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Email
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {addressbook.email}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Phone
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {addressbook.phone}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Added Date
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {new Date(addressbook.add_date).toLocaleDateString()}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Status
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {addressbook.status}
          </Typography>
        </Box>

        {addressbook.variables && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.7rem", display: "block", mt: 1, mb: 0.5 }}
            >
              Variables
            </Typography>
            {addressbook.variables.name && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Name:</strong> {addressbook.variables.name}
              </Typography>
            )}

            {addressbook.variables.sub1 && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Sub1:</strong> {addressbook.variables.sub1}
              </Typography>
            )}
            {addressbook.variables.sub2 && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Sub2:</strong> {addressbook.variables.sub2}
              </Typography>
            )}
            {addressbook.variables.sub3 && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Sub3:</strong> {addressbook.variables.sub3}
              </Typography>
            )}
            {addressbook.variables.sub4 && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Sub4:</strong> {addressbook.variables.sub4}
              </Typography>
            )}
            {addressbook.variables.pixel && (
              <Typography variant="caption" sx={{ fontSize: "0.7rem", display: "block", mb: 0.25 }}>
                <strong>Pixel:</strong> {addressbook.variables.pixel}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
