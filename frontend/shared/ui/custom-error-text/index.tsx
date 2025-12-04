export interface CustomErrorTextProps {
  message?: string;
}

export const CustomErrorText = ({ message }: CustomErrorTextProps) => {
  if (!message) return null;

  return <p className="text-red-500 text-sm mt-1 ml-1">{message}</p>;
};
