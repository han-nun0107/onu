import type { ComponentType, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "color" | "cursor"> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size: number | string;
  color?: string;
  ariaLabel?: string;
  className?: string;
  wrapperClassName?: string;
  cursor?: boolean;
};
