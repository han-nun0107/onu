import { memo } from "react";
import { Button } from "@/components";

type LoginMethodButtonProps = {
  id: string;
  label: string;
  value: "email" | "google";
  isActive: boolean;
  onClick: () => void;
};

const LoginMethodButton = memo(
  ({ label, isActive, onClick }: LoginMethodButtonProps) => {
    return (
      <Button
        type="button"
        variant="LOGIN_METHOD_BUTTON"
        onClick={onClick}
        className={
          isActive
            ? "bg-indigo-500 text-white"
            : "bg-white/50 text-gray-700 hover:bg-white/70"
        }
      >
        {label}
      </Button>
    );
  },
);

LoginMethodButton.displayName = "LoginMethodButton";

export default LoginMethodButton;
