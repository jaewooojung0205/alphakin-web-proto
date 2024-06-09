"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type UiStore, createUiStore, initUiStore } from "@/stores/ui-store";

export const UiStoreContext = createContext<StoreApi<UiStore> | null>(null);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const UiStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UiStore>>();
  if (!storeRef.current) {
    storeRef.current = createUiStore(initUiStore());
  }

  return (
    <UiStoreContext.Provider value={storeRef.current}>
      {children}
    </UiStoreContext.Provider>
  );
};

export const useUiStore = <T,>(selector: (store: UiStore) => T): T => {
  const uiStoreContext = useContext(UiStoreContext);

  if (!uiStoreContext) {
    throw new Error(`useUiStore must be use within UiStoreProvider`);
  }

  return useStore(uiStoreContext, selector);
};
