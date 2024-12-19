import React from "react";

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return <h4 className="font-semibold text-xl">{children}</h4>;
};

export default ModalHeader;
