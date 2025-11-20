import { cn } from "@/utils/cn";
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
  style?: React.CSSProperties;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = DEFAULT_BUTTON_VARIANT,
  className,
  style,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "cursor-pointer",
        BUTTON_VARIANTS[variant],
        { "cursor-not-allowed": disabled },
        className,
      )}
      style={style}
    >
      {children}
    </button>
  );
}
