import { memo } from "react";
import { cn } from "@/utils";
import {
  BUTTON_VARIANTS,
  DEFAULT_BUTTON_VARIANT,
  type ButtonVariant,
} from "@/foundations";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  "aria-label"?: string;
};

function Button({
  children,
  onClick,
  disabled = false,
  variant = DEFAULT_BUTTON_VARIANT,
  className,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "cursor-pointer",
        BUTTON_VARIANTS[variant],
        { "cursor-not-allowed": disabled },
        className,
      )}
    >
      {children}
    </button>
  );
}

export default memo(Button);
