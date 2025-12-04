import { PhoneInput } from "react-international-phone";

export interface CustomPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CustomPhoneInput = ({
  value,
  onChange,
}: CustomPhoneInputProps) => {
  return (
    <div className="w-[352px]">
      <PhoneInput
        defaultCountry="ua"
        value={value}
        onChange={(phone) => onChange?.(phone)}
        inputStyle={{
          height: "57px",
          fontSize: "16px",
          borderRadius: "15px",
        }}
        inputClassName="w-full h-[57px] rounded-[15px] text-base"
        className="w-full rounded-[15px] overflow-hidden"
        countrySelectorStyleProps={{
          style: {
            height: "57px",
            borderRadius: "15px 0 0 15px",
          },
        }}
      />
    </div>
  );
};
