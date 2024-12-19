import { Button } from "@/components/ui/Button";
import React from "react";
import { useModal } from "./Modal";

interface ModalButtonProps {
  children: React.ReactNode;
}

const ModalButton = ({ children }: ModalButtonProps) => {
  const { toggleModalOpen } = useModal();
  return <Button onClick={toggleModalOpen}>{children}</Button>;
};

export default ModalButton;
