import { LogOut, MessageSquare, Pencil, Share, User } from "lucide-react";
import type { ReactNode } from "react";

export type MenuItem = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

export const createMenuItems = (
  onMenuClick: (action: string) => void,
  isEditMode: boolean = false,
  isAdmin: boolean = false,
  isLoggedIn: boolean = false,
): MenuItem[] => {
  const menuItems: MenuItem[] = [];

  // 어드민일 때만 Edit 모드 메뉴 추가
  if (isAdmin) {
    menuItems.push({
      icon: <Pencil size={20} />,
      label: isEditMode ? "Edit 모드 끄기" : "Edit 모드",
      onClick: () => onMenuClick("edit"),
    });
  }

  menuItems.push(
    {
      icon: isLoggedIn ? <LogOut size={20} /> : <Share size={20} />,
      label: isLoggedIn ? "로그아웃" : "연동&로그인",
      onClick: () => onMenuClick(isLoggedIn ? "logout" : "login"),
    },
    {
      icon: <User size={20} />,
      label: "회원정보",
      onClick: () => onMenuClick("profile"),
    },
    {
      icon: <MessageSquare size={20} />,
      label: "건의사항",
      onClick: () => onMenuClick("contact"),
    },
  );

  return menuItems;
};
