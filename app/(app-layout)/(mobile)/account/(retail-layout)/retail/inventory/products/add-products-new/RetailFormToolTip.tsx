import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";

const RetailFormToolTip = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Info className="text-gray-400 w-5 h-5 hover:text-gray-600" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Form will <span className="text-brand">Retain</span> its previous
            values
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RetailFormToolTip;
