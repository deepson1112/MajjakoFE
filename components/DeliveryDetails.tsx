type DeliveryDriver = {
  id: number;
  name: string;
  primary_phone_number: string;
  secondary_phone_number: string;
  vehicle_model: string;
  vehicle_number: string;
  license_number: string;
};

const DeliveryDetails = ({
  deliveryDetails,
}: {
  deliveryDetails: DeliveryDriver | undefined;
}) => {
  return deliveryDetails ? (
    <div className="border border-dotted border-brand p-4 rounded-lg order-first mb-8 sm:mb-2 sm:order-none">
      <h6 className="text-brand underline mb-2">Delivery Rider Information</h6>
      <ul className="text-sm space-y-1">
        <li className="text-gray-500">
          Name:{" "}
          <span className="text-gray-700 font-semibold">
            {deliveryDetails.name}
          </span>
        </li>
        <li className="text-gray-500">
          Phone Number:{" "}
          <span className="text-gray-700 font-semibold">
            {deliveryDetails?.primary_phone_number}
          </span>
        </li>
        <li className="text-gray-500">
          Vehicle:{" "}
          <span className="text-gray-700 font-semibold">
            {deliveryDetails?.vehicle_model}
          </span>
        </li>
      </ul>
    </div>
  ) : null;
};

export default DeliveryDetails;
