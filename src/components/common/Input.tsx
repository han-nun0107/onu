import { forwardRef } from "react";
import { cn } from "@/utils/cn";

type InputProps = {
  type?: "text" | "email" | "password" | "tel" | "number";
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", placeholder, className, error, label, disabled, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm transition-all duration-200",
            "placeholder:text-gray-400",
            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
