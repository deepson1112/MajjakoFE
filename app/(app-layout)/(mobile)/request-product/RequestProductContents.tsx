import { Button } from "@/components/ui/Button";
import { Clock3, Mail, MapPinned, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";
import RequestProductForm from "./RequestProductForm";

type Props = {};

export default function RequestProductFormContents({}: Props) {
  return (
    <div className="max-w-screen-xl mx-auto p-5  font-[sans-serif]">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-md border">
        <div className="bg-slate-200 rounded-md  md:col-span-4 p-10 text-black space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
              Request a <span className="text-brand">Product</span>
            </h3>

            <p className="text-black">
              Can’t Find What You’re Looking For? Request a Product!
            </p>

            <p className="text-xs">
              At Majjakodeals, we’re committed to providing the products you
              love. If you’re searching for something specific but couldn’t find
              it on our site, we’ve got you covered! Simply fill out the form
              below to request the product you want, and we’ll do our best to
              add it to our store. Whether it’s a hard-to-find item or a
              favorite product that’s out of stock, let us know, and we’ll keep
              you updated on the availability.
            </p>
          </div>

          <div className="space-y-3">
            <h6 className="text-black">How It Works:</h6>
            <ul className="text-xs list-decimal list-inside space-y-1">
              <li>Enter the product details.</li>
              <li>Add any additional notes or preferences.</li>
              <li>
                Submit your request, and we’ll notify you when the product
                becomes available!
              </li>
            </ul>
          </div>
        </div>
        <RequestProductForm />
      </div>
    </div>
  );
}
