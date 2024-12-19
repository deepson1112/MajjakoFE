import React from "react";
import ViewProductNewEdit from "./ViewProductNewEdit";

interface ViewProductNewProps {
  params: {
    id: string;
  };
}

const ViewProductNew = ({ params }: ViewProductNewProps) => {
  const { id } = params;
  return (
    <div>
      <ViewProductNewEdit id={id} />
    </div>
  );
};

export default ViewProductNew;
