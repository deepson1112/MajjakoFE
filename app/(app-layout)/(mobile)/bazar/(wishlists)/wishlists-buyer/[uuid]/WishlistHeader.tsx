"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

const WishlistHeader = () => {
  return (
    <div className="justify-between  py-2">
      <Button
        className="flex items-center"
        onClick={() => {
          toast.info("Linked copied to your clipboard");
          navigator.clipboard.writeText(
            "https://majjakodeals.com/bazar/wishlists-buyer"
          );
        }}
      >
        Share My Wishlist <ExternalLink className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default WishlistHeader;
