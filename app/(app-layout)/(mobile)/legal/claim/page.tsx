"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-4 px-4 md:text-justify">
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h1 className="text-3xl md:text-4xl text-center md:text-justify font-bold mb-8">
          Claims and Refunds Policy Of
          <span className=" px-2 text-brand font-semibold ">Majjakodeals</span>
        </h1>
        <h2 className="text-2xl font-bold mb-2">Introduction</h2>
        <p className="mb-4">
          At{" "}
          <Link
            className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
            href={"/"}
          >
            Majjakodeals
          </Link>
          , we strive to provide the best online ordering experience. However,
          we understand that issues may arise, and we are here to help. This
          policy outlines the steps to make a claim, eligibility criteria, and
          how refunds are processed.
        </p>

        <h2 className="text-2xl font-bold mb-2">Claims Process</h2>

        <p className="mb-4">We may collect the following information:</p>
        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Initiating Claims</li>
          <ul className="list-disc list-inside mb-4">
            <li>Your name and contact information</li>
            <li>Demographic information</li>
            <li>
              Other information relevant to customer surveys and/or offers
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">
            2. Review and Investigation
          </li>
          <ul className="list-disc list-inside mb-4">
            <li>
              Our Customer Support team will review your claim within 48 hours.
            </li>
            <li>
              We may reach out for additional information or clarification to
              ensure a thorough investigation.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">3. Resolution</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              Once the investigation is complete, we will inform you of the
              outcome and the steps we will take to resolve the issue.
            </li>
            <li>
              Possible resolutions include replacements, refunds, or store
              credit, depending on the nature of the problem.
            </li>
          </ul>
        </ol>
        <h2 className="text-2xl font-bold mb-2">Eligibility for Claims</h2>

        <p className="mb-4">
          To be eligible for a claim, the following conditions must be met:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>Order Issues</li>
          <ul className="list-disc list-inside ml-4">
            <li>
              The product received is significantly different from the
              description on the website.
            </li>
            <li>The product is damaged, defective, or incorrect.</li>
            <li>Part of the order is missing or incomplete.</li>
          </ul>
          <li>Time Frame</li>
          <ul className="list-disc list-inside ml-4">
            <li>Claims must be made within 24 hours of receiving the order.</li>
            <li>
              Claims made after this period may not be eligible for a refund or
              replacement.
            </li>
          </ul>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Refunds</h2>

        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Refund Options</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              Depending on the resolution, refunds may be issued back to the
              original payment method, as store credit, or as a replacement
              product.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">2. Processing Time</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              Once a refund is approved, it will be processed within 5-7
              business days.
            </li>
            <li>
              The time it takes for the refund to reflect in your account may
              vary depending on your bank or payment provider.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">3. Shipping Costs</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              If the claim is due to our error (e.g., incorrect or defective
              product), we will cover the return shipping costs.
            </li>
            <li>
              If the claim is not due to our error, you may be responsible for
              covering the return shipping costs.
            </li>
          </ul>
        </ol>

        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>

        <p className="mb-4">
          If you have any questions or need further assistance with your claim,
          please do not hesitate to contact us:
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>
            Email:
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"mailto:support@chowchowexpress.com"}
            >
              support@chowchowexpress.com
            </Link>
          </li>
          <li>
            Phone:
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"tel:720-600-6200"}
            >
              720-600-6200
            </Link>
          </li>
          <li>
            Address:
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"#"}
            >
              1751 Hover Street, Longmont 80504
            </Link>
          </li>
        </ul>

        <p className="mb-4">
          Thank you for choosing us for your online ordering needs.
        </p>
      </div>
    </div>
  );
}
