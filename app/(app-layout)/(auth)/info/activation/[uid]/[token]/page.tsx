"use client";

import { Button } from "@/components/ui/Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}

export default function Page({ params }: Props) {
  const { uid, token } = params;

  const router = useRouter();

  const handleActivateFn = () => {
    // activation({ uid, token })
    //   .unwrap()
    //   .then(() => {
    //     toast({
    //       title: "Sucessfully Activated Account",
    //       variant: "default",
    //     });
    //     router.push("/sign-in");
    //   })
    //   .catch(() => {
    //     toast({
    //       title: "Failed to activate user",
    //       description: "Please try again later",
    //       variant: "destructive",
    //     });
    //   });
  };

  const { mutate: handleActivate, isLoading: handleActivateLoader } =
    useMutation<Response, AxiosError, unknown>({
      mutationFn: async () => {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/activation/`,
          {
            uid,
            token,
          }
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully Activated Account");
        router.push("/sign-in");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to activate user", {
          description: "Please try again later",
        });
      },
    });

  return (
    <main className="bg-white px-6 py-52  lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-brand">
          Sucessfully Registered
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to Majjakodeals!
        </h1>
        <p className="mt-6 mb-4 text-base leading-7 text-gray-600">
          Click the button to activate the button
        </p>
        <Button
          onClick={handleActivate}
          isLoading={handleActivateLoader}
          disabled={handleActivateLoader}
        >
          Activate Account
        </Button>
      </div>
    </main>
  );
}
