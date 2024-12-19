import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

const FormSchema = z.object({
  special_request: z.string(),
});

export function SpecialRequest({
  handleAddProductToCartWithSpecialRequest,
  handleAddProductToCartLoader,
  children,
  setIsSpecialRequestModalOpen,
  isSpecialRequestModalOpen,
  defaultRequest,
  id,
}: {
  handleAddProductToCartWithSpecialRequest?: (special_request: string) => void;
  handleAddProductToCartLoader?: boolean;
  setIsSpecialRequestModalOpen?: Dispatch<SetStateAction<boolean>>;
  isSpecialRequestModalOpen?: boolean;
  children: React.ReactNode;
  defaultRequest?: string | null;
  id?: number;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      special_request: defaultRequest || "",
    },
  });

  const handleSpecialRequest = (request: string) => {
    if (!!defaultRequest?.length) {
      handleUpdateSpecialRequest({ special_request: request.trim() });
    } else {
      if (handleAddProductToCartWithSpecialRequest) {
        handleAddProductToCartWithSpecialRequest(request.trim());
      }
    }
  };

  const {
    mutate: handleUpdateSpecialRequest,
    isLoading: handleUpdateSpecialRequestLoader,
  } = useMutation({
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      const response = api()
        .patch(payload, `/retail-marketplace/retail-cart/${id}/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Updated special request");
      if (setIsSpecialRequestModalOpen) {
        console.log("Hello World");
        setIsSpecialRequestModalOpen((prev) => !prev);
      }
      queryClient.invalidateQueries("retail-cart-data");
    },
    onError: () => {
      toast.error("Something ");
    },
  });

  return (
    <Dialog
      open={isSpecialRequestModalOpen}
      onOpenChange={setIsSpecialRequestModalOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[525px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Special Request</DialogTitle>
          <DialogDescription>
            You can add your any speical requirements for the given product if
            you have any.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                handleSpecialRequest(data.special_request)
              )}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="special_request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand">Optional</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Eg: name to be written in cake"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <span className="text-brand font-medium">
                        Add a Special Touch:
                      </span>{" "}
                      Personalize your order with details like the
                      recipient&apos;s name, a message, or the occassion. For
                      example, add instructions for a cake. Let us make your
                      purchase special!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  isLoading={
                    handleAddProductToCartLoader ||
                    handleUpdateSpecialRequestLoader
                  }
                  disabled={
                    handleAddProductToCartLoader ||
                    handleUpdateSpecialRequestLoader
                  }
                >
                  {defaultRequest ? "Save Changes" : "Add to cart"}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#FFFFFF"
                    className="ml-1"
                  >
                    <path
                      d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                      stroke="#FFFFFF"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
