import { cn } from "@/utils";
import type { IconProps } from "@/types/icon";

const Icon = ({
  icon: IconComponent,
  size = 24,
  color,
  ariaLabel,
  className,
  wrapperClassName,
  cursor = true,
  ...rest
}: IconProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        wrapperClassName,
        cursor && "cursor-pointer",
      )}
      style={{ width: size, height: size, color: color }}
    >
      <IconComponent
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        className={className}
        {...rest}
      />
    </div>
  );
};

export default Icon;
