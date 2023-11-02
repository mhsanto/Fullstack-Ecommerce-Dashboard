"use client";
import { userStoreModal } from "@/hooks/useStore-modal";
import { useEffect } from "react";
export default function SetupPage() {
  const isOpen = userStoreModal((state) => state.isOpen);
  const onOpen = userStoreModal((state) => state.onOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
