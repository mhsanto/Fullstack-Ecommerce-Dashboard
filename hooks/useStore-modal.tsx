//setup zustand store
import { create } from "zustand";

type useStoreModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}; //create store

export const userStoreModal = create<useStoreModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
