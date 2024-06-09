"use client";

import { auth } from "@/lib/firebase";
import { useUserStore } from "@/providers/user";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

interface UserFetchingProps {
  children: React.ReactNode;
}

export default function UserFetching(props: UserFetchingProps) {
  const { children } = props;
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // [todo] DB에서 fetching
      if (authUser) {
        setUser({
          id: authUser.uid,
          name: "Guest",
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [setUser]);

  return children;
}
