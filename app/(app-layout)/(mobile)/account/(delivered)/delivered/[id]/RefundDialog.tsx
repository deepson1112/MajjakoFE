import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { axiosInstance } from "@/lib/axiosInstance";
import { RefundReasons } from "@/lib/Constants";
import { getImageData } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  quantity: z.string({
    required_error: "Please select an quantity",
  }),
  reason: z.string({
    required_error: "Please select a reason",
  }),
  image: z.array(
    z
      .any()
      .optional()
      .refine(
        (files) => !files || files?.size <= MAX_FILE_SIZE,
        `Max file size is 10MB.`
      )
      .refine(
        (files) =>
          !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
  ),
});

interface RefundDialogProps {
  quantity: number;
  product_variation: number;

  order_id: number;
}

export function RefundDialog({
  quantity,
  product_variation,
  order_id,
}: RefundDialogProps) {
  console.log("THis is order_id", order_id);

  const [preview, setPreview] = useState<string[]>(["", "", ""]);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: handleRefundFn, isLoading: handleRefundFnLoader } =
    useMutation({
      mutationFn: async (payload: FormData) => {
        const { data } = await axiosInstance.post(
          "/retail-refund/retail-refund/",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return data;
      },
      onSuccess: () => {
        toast.success("Sucessfully refunded");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error("Cannot refund the product", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  function handleRefund(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("order", `${order_id}`);
    formData.append("refund_products[0]quantity", data.quantity);
    formData.append("refund_products[0]reason", data.reason);
    data.image
      .filter((img) => img && img instanceof File)
      .map((img, index) => {
        formData.append(`refund_products[0]image_${index + 1}`, img);
      });
    formData.append(
      "refund_products[0]product_variation",
      `${product_variation}`
    );
    handleRefundFn(formData);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Refund</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Refund Product</DialogTitle>
          <DialogDescription>
            You need to provide reasons to refund the product
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRefund)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Quantity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of item quantity you want to return" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: quantity }).map((_, index) => (
                        <SelectItem
                          key={`refund-quantity-${index}`}
                          value={`${index + 1}`}
                        >
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select Number of Product will be returned.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Reason</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the reason for refund" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RefundReasons.map((reason, index) => (
                        <SelectItem
                          key={`refund-reason-${index}`}
                          value={reason.value}
                        >
                          {reason.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label className="font-semibold">
                Proof to support your{" "}
                <span className="text-brand">Reason of Return</span>
              </Label>
              <div className="flex items-center gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <FormField
                    key={`refund-proof-image-${index}`}
                    control={form.control}
                    name={`image.${index}`}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <div>
                          <label htmlFor={`refund-item-img-${index}`}>
                            <Avatar className="w-full rounded-lg">
                              <AvatarImage
                                src={preview[index]}
                                className="object-center object-cover"
                              />
                              <AvatarFallback className="rounded-lg bg-white">
                                <div
                                  className="w-full h-full relative border-2 border-gray-300 border-dashed rounded-lg p-2 cursor-pointer"
                                  id="dropzone"
                                >
                                  <div className="w-full h-full flex gap-2 items-center text-center">
                                    <Plus />
                                  </div>
                                </div>
                              </AvatarFallback>
                            </Avatar>
                          </label>

                          <Input
                            type="file"
                            name={`refund-item-img-${index}`}
                            id={`refund-item-img-${index}`}
                            className="sr-only"
                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);

                              setPreview((prev) =>
                                prev.map((value, stateIdx) =>
                                  stateIdx === index ? displayUrl : value
                                )
                              );
                              onChange(
                                event.target.files
                                  ? event.target.files[0]
                                  : null
                              );
                            }}
                          />
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              isLoading={handleRefundFnLoader}
              disabled={handleRefundFnLoader}
            >
              Refund
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
