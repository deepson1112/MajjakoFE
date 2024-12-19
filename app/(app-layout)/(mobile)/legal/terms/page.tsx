"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-4 px-4 md:text-justify">
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h1 className="text-3xl md:text-4xl text-center md:text-justify font-bold mb-8">
          Terms and Conditions Of
          <span className=" px-2 text-brand font-semibold ">Majjakodeals</span>
        </h1>
        <h2 className="text-2xl font-bold mb-2">Introduction</h2>
        <p className="mb-4">
          Welcome to
          <Link
            className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
            href={"/"}
          >
            Majjakodeals
          </Link>
          ! These Terms and Conditions (&quot;Terms&quot;) govern your use of
          our website and services. By accessing or using our site, you agree to
          be bound by these Terms. If you do not agree to these Terms, please do
          not use our website.
        </p>

        {/* definitions */}
        <h2 className="text-2xl font-bold mb-2">Definitions</h2>

        <ul className="list-disc list-inside mb-4">
          <li>
            &quot;We,&quot; &quot;Us,&quot; &quot;Our&quot;: Refers to
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"/"}
            >
              Majjakodeals
            </Link>
            .
          </li>
          <li>
            &quot;User,&quot; &quot;You,&quot; &quot;Your&quot;: Refers to the
            individual or entity using our website or services.
          </li>
          <li>
            &quot;Services&quot;: Refers to the online ordering and related
            services provided by
            <Link
              className="border-dotted px-1 text-brand border-b-[1px] font-semibold border-brand"
              href={"/"}
            >
              Majjakodeals
            </Link>
            .
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">Use of Our Services</h2>

        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Eligibility</li>
          <ul className="list-disc list-inside mb-4">
            <li>You must be at least 16 years old to use our services.</li>
            <li>
              By using our services, you represent that you meet these
              eligibility requirements.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">2. Account Registration</li>
          <ul className="list-disc list-inside mb-4">
            <li>To place an order, you may need to create an account.</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </li>
            <li>
              You agree to provide accurate, current, and complete information
              during the registration process.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">3. Prohibited Conduct</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              You agree not to use our services for any unlawful or prohibited
              activities.
            </li>
            <li>
              You agree not to interfere with the operation of our website or
              services.
            </li>
          </ul>
        </ol>

        {/* order and payments */}
        <h2 className="text-2xl font-bold mb-2">Orders and Payment</h2>

        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Order Acceptance</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              All orders placed through our website are subject to acceptance by
              us.
            </li>
            <li>
              We reserve the right to refuse or cancel any order for any reason,
              including but not limited to product availability, errors in
              pricing or product descriptions, or suspected fraud.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">2. Pricing and Payment</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              All prices are listed in USD and are subject to change without
              notice.
            </li>
            <li>
              Payment must be made at the time of order placement using the
              available payment methods.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">3. Order Confirmation</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              You will receive an email confirmation once your order has been
              placed successfully.
            </li>
            <li>
              If there are any issues with your order, we will contact you via
              the provided contact information.
            </li>
          </ul>
        </ol>

        {/* shipping and delivery */}
        <h2 className="text-2xl font-bold mb-2">Shipping and Delivery</h2>

        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Shipping Policy</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              We offer various shipping options, which will be displayed at
              checkout.
            </li>
            <li>
              Shipping times and costs may vary depending on your location and
              the selected shipping method.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">2. Delivery</li>
          <ul className="list-disc list-inside mb-4">
            <li>Delivery times are estimates and are not guaranteed.</li>
            <li>
              We are not responsible for delays caused by external factors such
              as weather etc.
            </li>
          </ul>
        </ol>
        <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>

        <ol type="1">
          <li className="text-lg font-bold mb-2">1. Disclaimer</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              Our services are provided &quot;as is&quot; without warranties of
              any kind, either express or implied.
            </li>
            <li>
              We do not guarantee that our website will be uninterrupted or
              error-free.
            </li>
          </ul>
          <li className="text-lg font-bold mb-2">2. Limitation</li>
          <ul className="list-disc list-inside mb-4">
            <li>
              To the fullest extent permitted by law, we are not liable for any
              direct, indirect, incidental, special, or consequential damages
              arising out of your use of our services.
            </li>
          </ul>
        </ol>
        <h2 className="text-2xl font-bold mb-2">Returns and Refunds</h2>

        <p className="mb-4">
          Please refer to our
          <Link className="px-1 text-brand font-semibold " href={"/claim"}>
            Claims and Refund Policy
          </Link>
          for detailed information on returns and refunds.
        </p>

        <h2 className="text-2xl font-bold mb-2">Changes to These Terms</h2>

        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Any changes
          will be posted on this page, and the &quot;Last Updated&quot date will
          be revised. Your continued use of our website and services after any
          changes constitute your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-bold mb-2">Governing Law</h2>

        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws
          of United States Of America, without regard to its conflict of law
          principles.
        </p>

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
