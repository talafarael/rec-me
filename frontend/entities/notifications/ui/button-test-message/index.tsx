import { ILeadformNotifications } from "@/entities/token/types/token";
import { CustomButton } from "@/shared/ui/custom-button";
import { useState, useEffect } from "react";

export interface ButtonTestMessageProps {
  data: ILeadformNotifications;
  handler: (data: ILeadformNotifications) => Promise<boolean>;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
}
export const ButtonTestMessage = ({
  data,
  handler,
  // loading = false,
  // disabled = false,
  error: externalError,
}: ButtonTestMessageProps) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (externalError) {
      setError(externalError);
      setSuccess(false);
    }
  }, [externalError]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSuccess(false);
    setError(undefined);
    const result = await handler(data);
    if (result) {
      setSuccess(true);
      setError(undefined);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(externalError || "Ошибка отправки сообщения");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CustomButton
        variant="admin"
        onClick={handleClick}
        name="action"
        value="publish"
        label="Отправить тестовое сообщение"
        type="button"
        className="w-[296px]"
      />
      {success && (
        <span className="text-green-500 text-sm">Сообщение отправлено</span>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
