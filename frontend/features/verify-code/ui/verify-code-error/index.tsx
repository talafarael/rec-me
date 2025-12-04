import { Alert } from "@mui/material";

export interface VerifyCodeError {
  message?: string;
}
export const VerifyCodeError = ({ message }: VerifyCodeError) => {
  return <Alert severity="error">{message}</Alert>;
};
