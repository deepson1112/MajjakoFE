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
import { Review } from "./ProductReviews";
import Image from "next/image";
import { Textarea } from "@/components/ui/Textarea";
import ProductRatings from "../../bazar/(products)/products/[subCategoryId]/[productId]/ProductsRatings";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";
import { useState } from "react";
import { queryClient } from "@/lib/queryClient";

const ReplyReviewSchema = z.object({
  reply: z.string().min(1, "Please enter your reply"),
});

export type ReplyReviewType = z.infer<typeof ReplyReviewSchema>;

export function ReplyReview({
  id,
  ordered_product,
  description,
  image_1,
  image_2,
  image_3,
  rating,
  reply,
}: Review) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const form = useForm<ReplyReviewType>({
    resolver: zodResolver(ReplyReviewSchema),
    defaultValues: {
      reply: reply || "",
    },
  });

  const { mutate: handleReplyReview, isLoading: handleReplyReviewLoader } =
    useMutation({
      mutationFn: async (payload: ReplyReviewType) => {
        const response = await api()
          .patch(payload, `/review/vendor-review/${id}/`)
          .json();
        return response;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("vendor-review");
        setIsReplyOpen(false);
        toast.success("Successfully replied to the review");
      },
      onError: (error) => {
        toast.error("Unable to reply the review");
      },
    });
  return (
    <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
      <DialogTrigger asChild>
        <Button>Reply</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[600px]"
      >
        <DialogHeader>
          <DialogTitle>Reply Review</DialogTitle>
          <DialogDescription>
            View and reply your product&apos;s review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-3 bg-gray-50 rounded-lg p-2">
            <div className="flex md:flex-row flex-col items-center gap-3">
              <h4 className="font-semibold text-lg">
                {ordered_product.product_name}
              </h4>
              <ProductRatings sm rating={rating} />
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-xs md:max-w-sm">
              {image_1 ? (
                <Image
                  alt={`${ordered_product.product_name}-review-image-1`}
                  src={image_1}
                  width={500}
                  height={500}
                  className="object-cover object-center border rounded-xl"
                />
              ) : null}

              {image_2 ? (
                <Image
                  alt={`${ordered_product.product_name}-review-image-2`}
                  src={image_2}
                  width={500}
                  height={500}
                  className="object-cover object-center border rounded-xl"
                />
              ) : null}

              {image_3 ? (
                <Image
                  alt={`${ordered_product.product_name}-review-image-3`}
                  src={image_3}
                  width={500}
                  height={500}
                  className="object-cover object-center border rounded-xl"
                />
              ) : null}
            </div>

            <p className="border py-1 px-2 rounded-lg text-sm">{description}</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => handleReplyReview(data))}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="reply"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Write your product review here..."
                        {...field}
                      ></Textarea>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                isLoading={handleReplyReviewLoader}
                disabled={handleReplyReviewLoader}
              >
                Reply
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
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
