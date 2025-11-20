type ScrollLockState = {
  scrollY: number;
  originalBodyOverflow: string;
  originalBodyPosition: string;
  originalBodyTop: string;
  originalBodyWidth: string;
};

export function lockScroll(): ScrollLockState {
  const scrollY = window.scrollY;
  const state: ScrollLockState = {
    scrollY,
    originalBodyOverflow: document.body.style.overflow,
    originalBodyPosition: document.body.style.position,
    originalBodyTop: document.body.style.top,
    originalBodyWidth: document.body.style.width,
  };

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  return state;
}

export function unlockScroll(state: ScrollLockState): void {
  document.body.style.position = state.originalBodyPosition;
  document.body.style.top = state.originalBodyTop;
  document.body.style.width = state.originalBodyWidth;
  document.body.style.overflow = state.originalBodyOverflow;
  window.scrollTo(0, state.scrollY);
}
