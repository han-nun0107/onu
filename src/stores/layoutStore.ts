import { create } from "zustand";

type LayoutState = {
  isLeftMenuOpen: boolean;
  isSearchOpen: boolean;
  isSortOpen: boolean;
  isFilterOpen: boolean;
  toggleLeftMenu: () => void;
  toggleSearch: () => void;
  toggleSort: () => void;
  toggleFilter: () => void;
  closeLeftMenu: () => void;
  closeSearch: () => void;
  closeSort: () => void;
  closeFilter: () => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  isLeftMenuOpen: false,
  isSearchOpen: false,
  isSortOpen: false,
  isFilterOpen: false,
  toggleLeftMenu: () =>
    set((state) => ({
      isLeftMenuOpen: !state.isLeftMenuOpen,
      isSearchOpen: false,
      isSortOpen: false,
      isFilterOpen: false,
    })),
  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
      isLeftMenuOpen: false,
      isSortOpen: false,
      isFilterOpen: false,
    })),
  toggleSort: () =>
    set((state) => ({
      isSortOpen: !state.isSortOpen,
      isLeftMenuOpen: false,
      isSearchOpen: false,
      isFilterOpen: false,
    })),
  toggleFilter: () =>
    set((state) => ({
      isFilterOpen: !state.isFilterOpen,
      isLeftMenuOpen: false,
      isSearchOpen: false,
      isSortOpen: false,
    })),
  closeLeftMenu: () => set({ isLeftMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  closeSort: () => set({ isSortOpen: false }),
  closeFilter: () => set({ isFilterOpen: false }),
}));
