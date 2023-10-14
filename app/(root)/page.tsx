"use client";
import Modal from "@/components/ui/Modal";
import { userStoreModal } from "@/hooks/useStore-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
export default function RootPage() {
  const isOpen = userStoreModal((state) => state.isOpen);
  const onOpen = userStoreModal((state) => state.onOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return <div className="p-4"></div>;
}
