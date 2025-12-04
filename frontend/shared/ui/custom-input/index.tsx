export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CustomInput = ({
  value,
  onChange,
  ...props
}: CustomInputProps) => {
  return (
    <input
      onChange={onChange}
      value={value ?? ""}
      className="w-[352px] pl-[10px] h-[57px] rounded-[15px]"
      {...props}
    />
  );
};
