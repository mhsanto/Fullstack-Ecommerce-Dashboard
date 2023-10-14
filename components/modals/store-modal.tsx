"use client";
import { userStoreModal } from "@/hooks/useStore-modal";
import React from "react";
import Modal from "../ui/Modal";

const StoreModal = () => {
  const isOpen = userStoreModal((state) => state.isOpen);
  const onClose = userStoreModal((state) => state.onClose);
  return (
    <Modal
      isOpen={isOpen}
      title="Create Store"
      description="Add a new store to manage products and categories"
      onClose={() => onClose}
    >
      StoreModal
    </Modal>
  );
};

export default StoreModal;
