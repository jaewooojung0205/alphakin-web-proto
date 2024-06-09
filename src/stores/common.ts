import { createStore } from "zustand/vanilla";

export type CommonState = {
  sidebarExpanded: boolean;
};

export type CommonActions = {
  toggleSidebar: () => void;
};

export type CommonStore = CommonState & CommonActions;

export const initCommonStore = (): CommonState => {
  return defaultInitState;
};

export const defaultInitState: CommonState = {
  sidebarExpanded: false,
};

export const createCommonStore = (
  initState: CommonState = defaultInitState
) => {
  return createStore<CommonStore>()((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({ ...state, sidebarExpanded: !state.sidebarExpanded })),
  }));
};
