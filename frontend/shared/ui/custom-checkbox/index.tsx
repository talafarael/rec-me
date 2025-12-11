export interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

export const CustomCheckbox = ({
  checked,
  onChange,
  className,
  ...props
}: CustomCheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked ?? false}
      onChange={onChange}
      className={`w-5 h-5 ${className || ""}`}
      {...props}
    />
  );
};

