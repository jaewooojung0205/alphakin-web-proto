"use client";

import { activateAnalytics } from "@/lib/firebase";
import { useEffect } from "react";

interface AnalyticsProps {
  children: React.ReactNode;
}

export function Analytics(props: AnalyticsProps) {
  const { children } = props;

  useEffect(() => {
    activateAnalytics();
  }, []);

  return children;
}
