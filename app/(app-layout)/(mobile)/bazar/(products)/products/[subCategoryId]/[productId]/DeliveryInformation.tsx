import { MapPin, Truck } from "lucide-react";
import React from "react";

const DeliveryInformation = () => {
  return (
    <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">
      <h6 className="mb-2 font-semibold">Delivery Options</h6>
      <ul className="space-y-2">
        <li className="flex items-center gap-1">
          <Truck /> Estimate 
          <span className="font-semibold">1-2 days</span> delivery.
        </li>
        <li className="flex items-center gap-1 font-medium">
          <MapPin />
          Bagmati, Kathmandu Metro 22 - Newroad Area, Newroad
        </li>
      </ul>
    </div>
  );
};

export default DeliveryInformation;
