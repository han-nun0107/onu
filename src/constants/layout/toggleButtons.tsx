import { Filter, ListFilter, Menu } from "lucide-react";
import type { ReactNode } from "react";

export type ToggleButton = {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  active?: boolean;
};

const MenuIcon = () => <Menu size={20} />;

const SortIcon = () => <ListFilter size={20} />;

const FilterIcon = () => <Filter size={20} />;

export const createToggleButtons = (
  handlers: {
    onMenuClick: () => void;
    onSortClick: () => void;
    onFilterClick: () => void;
  },
  onCloseExpanded: () => void,
): ToggleButton[] => [
  {
    id: "toggle-1",
    label: "메뉴",
    icon: <MenuIcon />,
    onClick: () => {
      handlers.onMenuClick();
      onCloseExpanded();
    },
  },
  {
    id: "toggle-2",
    label: "정렬",
    icon: <SortIcon />,
    onClick: () => {
      handlers.onSortClick();
      onCloseExpanded();
    },
  },
  {
    id: "toggle-3",
    label: "필터",
    icon: <FilterIcon />,
    onClick: () => {
      handlers.onFilterClick();
      onCloseExpanded();
    },
  },
];
