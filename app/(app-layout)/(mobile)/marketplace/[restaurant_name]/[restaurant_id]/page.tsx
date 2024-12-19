import React from "react";

interface Props {
  params: {
    restaurant_name: string;
    restaurant_id: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div>
      <h1>{params.restaurant_id} </h1>
      <h1>{params.restaurant_name} </h1>
    </div>
  );
};

export default page;
