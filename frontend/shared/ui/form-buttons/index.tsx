import { CustomButton } from "../custom-button";
import { CustomErrorText } from "../custom-error-text";

export interface FormButtonsProps {
  loading?: boolean;
  success: boolean;
  handlerCancel?: () => void;
  error?: string;
}
export const FormButtons = ({
  loading,
  success,
  error,
  handlerCancel,
}: FormButtonsProps) => {
  return (
    <div className="flex justify-between w-[580px] mt-[15px] mb-[20px]">
      <div>{error && <CustomErrorText message={error} />}</div>
      <div className=" flex gap-[10px] ">
        {handlerCancel && (
          <CustomButton
            label="cancel"
            variant="admin"
            type="button"
            onClick={handlerCancel}
            className="bg-[white] text-black border-black border-[1.5px]"
          />
        )}

        <CustomButton
          label="save"
          variant="admin"
          type="submit"
          disabled={loading}
          className={
            success
              ? "w-[120px]   h-[47px] bg-[#22c55e] text-[white] text-[16px]"
              : ""
          }
        />
      </div>
    </div>
  );
};
