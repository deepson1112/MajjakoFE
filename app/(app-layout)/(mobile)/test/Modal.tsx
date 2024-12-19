"use client";
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  modalOpen: boolean;
  toggleModalOpen: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <ModalContext.Provider value={{ modalOpen, toggleModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("User Context must be used inside UserContextProvider");
  }
  return context;
};

export default Modal;
