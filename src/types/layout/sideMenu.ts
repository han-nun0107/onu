import type { ReactNode } from "react";

export type MenuItem = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

export type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
};

