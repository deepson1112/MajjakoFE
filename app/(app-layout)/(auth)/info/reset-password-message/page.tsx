import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordMessagePage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-20 lg:px-8">
        <div className="text-center flex flex-col items-center">
          <p className="text-base font-semibold text-green-500 mb-3">
            Sucessfully Reset Password
          </p>
          <Image
            src={"/mailbox.png"}
            alt="mailbox-icon"
            height={520}
            width={520}
            className="w-28 h-28"
          />

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Email Confirmation
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Please check email to verify your account and set new password
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Sign In Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
