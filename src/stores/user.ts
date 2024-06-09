import { createStore } from "zustand/vanilla";

export type UserState = {
  user: IUser | null;
};

export type UserActions = {
  setUser: (value: IUser | null) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return defaultInitState;
};

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (value: IUser | null) =>
      set((state) => ({ ...state, user: value })),
  }));
};
