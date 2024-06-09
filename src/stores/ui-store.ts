import { createStore } from "zustand/vanilla";

export type UiState = {
  sidebarExpanded: boolean;
};

export type UiActions = {
  toggleSidebar: () => void;
};

export type UiStore = UiState & UiActions;

export const initUiStore = (): UiState => {
  return defaultInitState;
};

export const defaultInitState: UiState = {
  sidebarExpanded: false,
};

export const createUiStore = (initState: UiState = defaultInitState) => {
  return createStore<UiStore>()((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({ ...state, sidebarExpanded: !state.sidebarExpanded })),
  }));
};
