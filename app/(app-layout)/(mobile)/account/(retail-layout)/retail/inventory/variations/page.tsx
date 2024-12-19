import React from "react";
import AddVariationType from "./AddVariationType";
import VariationType from "./VariationType";

const VariationPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900">
          Product Variations
        </h2>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-700">
            All Variations
          </h4>
          <AddVariationType />
        </div>
        <VariationType />
      </section>
    </div>
  );
};

export default VariationPage;
