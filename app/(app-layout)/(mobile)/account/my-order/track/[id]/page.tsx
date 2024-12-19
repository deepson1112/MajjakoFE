import React from "react";
import TrackItems from "./TrackItems";

interface TrackItemsProps {
  params: {
    id: string;
  };
}

const TrackItemsPage = ({ params }: TrackItemsProps) => {
  const { id } = params;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Track Orders
      </h2>
      <TrackItems id={id} />
    </div>
  );
};

export default TrackItemsPage;
