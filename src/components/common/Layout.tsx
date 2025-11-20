import { useState } from "react";
import { useLayoutStore } from "@/stores/layoutStore";
import { useSearchStore } from "@/stores/searchStore";
import { useSearchSongs, useNavigation } from "@/hooks";
import type { SongData } from "@/api/songdb";
import { copyToClipboard } from "@/utils";
import {
  SideMenu,
  SearchPanel,
  SortPanel,
  FilterPanel,
  ToggleButtonGroup,
} from "@/components";

type ToggleButton = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

type LayoutProps = {
  children: React.ReactNode;
  toggleButtons?: ToggleButton[];
};

export default function Layout({ children, toggleButtons = [] }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    isLeftMenuOpen,
    isSearchOpen,
    isSortOpen,
    isFilterOpen,
    toggleLeftMenu,
    toggleSearch,
    toggleSort,
    toggleFilter,
    closeLeftMenu,
    closeSearch,
    closeSort,
    closeFilter,
  } = useLayoutStore();
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();
  const { searchResults, isLoading: isSearchLoading } =
    useSearchSongs(searchQuery);
  const { navigateToAuth } = useNavigation();

  const defaultToggleButtons: ToggleButton[] = [
    {
      id: "toggle-1",
      label: "메뉴",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
      onClick: () => {
        toggleLeftMenu();
        setIsExpanded(false);
      },
    },
    {
      id: "toggle-2",
      label: "검색",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      onClick: () => {
        toggleSearch();
        setIsExpanded(false);
      },
    },
    {
      id: "toggle-3",
      label: "정렬",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
      ),
      onClick: () => {
        toggleSort();
        setIsExpanded(false);
      },
    },
    {
      id: "toggle-4",
      label: "필터",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      ),
      onClick: () => {
        toggleFilter();
        setIsExpanded(false);
      },
    },
  ];

  const buttons =
    toggleButtons.length > 0 ? toggleButtons : defaultToggleButtons;

  const handleMenuClick = (action: string) => {
    closeLeftMenu();
    switch (action) {
      case "edit":
        break;
      case "login":
      case "profile":
        navigateToAuth();
        break;
    }
  };

  const handleSongClick = async (song: SongData) => {
    const title = song.title || "제목 없음";
    const textToCopy = `신청 - ${title}`;
    await copyToClipboard(textToCopy, `${title}을(를) 복사했습니다.`);
    closeSearch();
  };

  const menuItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      label: "Edit 모드",
      onClick: () => handleMenuClick("edit"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
      label: "연동&로그인",
      onClick: () => handleMenuClick("login"),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "회원정보",
      onClick: () => handleMenuClick("profile"),
    },
  ];

  return (
    <div className="relative min-h-screen">
      {children}

      <SideMenu
        isOpen={isLeftMenuOpen}
        onClose={closeLeftMenu}
        menuItems={menuItems}
      />

      <SearchPanel
        isOpen={isSearchOpen}
        onClose={closeSearch}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
        searchResults={searchResults}
        isLoading={isSearchLoading}
        onSongClick={handleSongClick}
      />

      <SortPanel isOpen={isSortOpen} onClose={closeSort} />

      <FilterPanel isOpen={isFilterOpen} onClose={closeFilter} />

      <ToggleButtonGroup
        buttons={buttons}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
}
