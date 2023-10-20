"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};
const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure ? "
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-7 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
