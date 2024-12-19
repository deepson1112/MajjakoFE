import { Clock3, Mail, MapPinned, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";
import ContactForm from "./ContactForm";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="max-w-screen-xl mx-auto p-5  font-[sans-serif]">
      <div className="banner-section rounded-lg overflow-hidden h-72 w-full">
        <div className="h-full w-full bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl">Contact Us</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-md border">
        <div className="bg-slate-200 rounded-md  md:col-span-4 p-10 text-black">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">
            Contact
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Let&apos;s <span className="text-brand">Talk</span>
          </h3>
          <p className="mt-4 leading-7 text-black">
            Need Assistance or Have Questions? Connect with Us – We&apos;re Here
            to Support You Every Step of the Way!
          </p>

          <div className="flex items-center mt-5">
            <MapPinned className="h-6 mr-2 text-black" />

            <Link
              title="Majjakodeals Location"
              className="text-sm"
              href={"/locations?lat=40.189658909967704&lng=-105.13122140434255"}
            >
              1751 Hover Street, Longmont 80504
            </Link>
          </div>
          <div className="flex items-center mt-5">
            <PhoneCall className="h-6 mr-2 text-black" />
            <Link
              title="Phone Number"
              className="text-sm"
              href={"tel:720-600-6200"}
            >
              720-600-6200
            </Link>
          </div>
          <div className="flex items-center mt-5">
            <Mail className="h-6 mr-2 text-black" />
            <Link
              title="E-mail"
              className="text-sm"
              href={"mailto:support@chowchowexpress.com"}
            >
              support@chowchowexpress.com
            </Link>
          </div>
          <div className="flex items-center mt-5">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 mr-2 text-black"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              title="Majjakodeals Facebook"
              className="text-sm"
              href={"https://www.facebook.com/profile.php?id=61553257894511"}
              target="_blank"
            >
              Majjakodeals
            </Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
