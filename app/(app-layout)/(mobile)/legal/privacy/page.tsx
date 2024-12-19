"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-4 px-4 md:text-justify">
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h1 className="text-3xl md:text-4xl text-center md:text-justify font-bold mb-8">
          Privacy Policy of
          <span className=" px-2 text-brand font-semibold ">Majjakodeals</span>
        </h1>
        <h2 className="text-2xl font-bold mb-2">Introduction</h2>
        <p className="mb-4">
          <Link
            className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
            href={"/"}
          >
            Majjakodeals
          </Link>
          values your privacy. This policy outlines how we collect, use, and
          protect your information when you use our website.
        </p>

        <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>

        <p className="mb-4">We may collect the following information:</p>
        <h5 className="text-lg font-bold mb-2">a. Personal Data</h5>
        <ul className="list-disc list-inside mb-4">
          <li>Your name and contact information</li>
          <li>Demographic information</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
        <h5 className="text-lg font-bold mb-2">b. Non-Personal Data</h5>
        <ul className="list-disc list-inside mb-4">
          <li>
            To improve user experience and our services, we may gather
            non-personal information about you, such as your operating system,
            device type, and browser type.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">How We Use the Information</h2>

        <p className="mb-4">
          We require this information to understand your needs and provide you
          with a better service, and in particular for the following reasons:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>Internal record keeping</li>
          <li>Improving our products and services</li>
          <li>Send promotional materials</li>
          <li>Conduct market research</li>
          <li>Customize website content to your preferences</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Cookies</h2>

        <p className="mb-4">
          Cookies help us personalize your experience by remembering your
          preferences and tracking website usage. You can control cookie
          settings through your browser.
        </p>

        <h2 className="text-2xl font-bold mb-2">Security</h2>

        <p className="mb-4">
          We are committed to ensuring that your information is secure. In order
          to prevent unauthorized access or disclosure, we have put in place
          place industry-standard security measures.
        </p>

        <h2 className="text-2xl font-bold mb-2">External Links</h2>

        <p className="mb-4">
          Our website may contain links to third-party sites. We do not control
          these sites and are not responsible for their privacy practices.
          Review their policies separately.
        </p>

        <h2 className="text-2xl font-bold mb-2">
          Controlling Your Personal Information
        </h2>

        <p className="mb-4">
          You may choose to restrict the collection or use of your personal
          information in the following ways:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>
            If you have previously agreed to us using your personal information
            for direct marketing purposes, you may change your mind at any time
            by writing to or emailing us at
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"mailto:support@chowchowexpress.com"}
            >
              support@chowchowexpress.com
            </Link>
            .
          </li>
          <li>
            We will not sell, distribute, or lease your personal information to
            third parties unless we have your permission or are required by law
            to do so. We may use your personal information to send you
            promotional information about third parties which we think you may
            find interesting if you tell us that you wish this to happen.
          </li>
          <li>
            You may request details of personal information which we hold about
            you. If you would like a copy of the information held on you, please
            write to
            <span className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand">
              Majjakodeals, 1751 Hover Street, Longmont 80504
            </span>
            -or- email
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"mailto:support@chowchowexpress.com"}
            >
              support@chowchowexpress.com
            </Link>
            .
          </li>
          <li>
            If you believe that any information we are holding on you is
            incorrect or incomplete, please write to or email us as soon as
            possible at the above address. We will promptly correct any
            information found to be incorrect.
          </li>
        </ul>

        <p className="mb-4">
          This privacy policy is subject to change without notice.
        </p>
      </div>
    </div>
  );
}
