import Ratings from "@/app/(app-layout)/(mobile)/bazar/(products)/products/[subCategoryId]/[productId]/Ratings";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
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
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { cn, getImageData } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const ReviewSchema = z.object({
  description: z.string(),
  rating: z.number(),
  image_1: z
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
    ),
  image_2: z
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
    ),
  image_3: z
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
    ),
});

export type ReviewType = z.infer<typeof ReviewSchema>;

interface RefundDialogProps {
  id: number;
  review: {
    created_date: string;
    description: string;
    id: number;
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    is_approved: boolean;
    ordered_product: number;
    rating: number;
    reply: string | null;
    updated_date: string;
    user: number;
  } | null;
}

export function ReviewDialog({ id, review }: RefundDialogProps) {
  const [preview, setPreview] = useState<string[]>(["", "", ""]);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ReviewType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      description: "",
      rating: 0,
    },
  });

  const { mutate: handleAddReviewFn, isLoading: handleAddReviewFnLoader } =
    useMutation({
      mutationFn: async (payload: FormData) => {
        const { data } = await axiosInstance.post(
          "/review/user-review/",
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
        toast.success("Sucessfully reviewed product");
        queryClient.invalidateQueries("ordered-product-completed");
        setIsOpen(false);
        setPreview(["", "", ""]);
        form.reset({
          description: "",
          rating: 0,
          image_1: undefined,
          image_2: undefined,
          image_3: undefined,
        });
      },
      onError: (error: any) => {
        toast.error("Cannot review the product", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  console.log(form.formState.errors);
  console.log("Form watch", form.watch());

  const { mutate: handleUpdateReviewFn, isLoading: handleAddUpdateFnLoader } =
    useMutation({
      mutationFn: async (payload: FormData) => {
        const { data } = await axiosInstance.patch(
          `/review/user-review/${review?.id!}/`,
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
        toast.success("Sucessfully reviewed product");
        queryClient.invalidateQueries("ordered-product-completed");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error("Cannot review the product", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });

  const handleUpdateReview = (data: ReviewType) => {
    const formData = new FormData();
    formData.append("ordered_product", `${id}`);
    formData.append("rating", `${data.rating}`);
    formData.append("description", `${data.description}`);
    formData.append("is_approved", `true`);

    if (data.image_1 !== null) {
      if (data.image_1 === undefined) {
        formData.append(`image_1`, "");
      } else if (data.image_1 instanceof File) {
        formData.append(`image_1`, data.image_1);
      }
    }

    if (data.image_2 !== null) {
      if (data.image_2 === undefined) {
        formData.append(`image_2`, "");
      } else if (data.image_2 instanceof File) {
        formData.append(`image_2`, data.image_2);
      }
    }

    if (data.image_3 !== null) {
      if (!data.image_3 === undefined) {
        formData.append(`image_3`, "");
      } else if (data.image_3 instanceof File) {
        formData.append(`image_3`, data.image_3);
      }
    }

    // if (
    //   !data.image_1 ||
    //   data.image_1 instanceof File ||
    //   typeof data.image_1 !== "string"
    // ) {
    //   formData.append(
    //     `image_1`,
    //     data.image_1 instanceof File ? data.image_1 : ""
    //   );
    // }
    // if (
    //   !data.image_2 ||
    //   data.image_2 instanceof File ||
    //   typeof data.image_2 !== "string"
    // ) {
    //   formData.append(
    //     `image_2`,
    //     data.image_2 instanceof File ? data.image_2 : ""
    //   );
    // }
    // if (
    //   !data.image_3 ||
    //   data.image_3 instanceof File ||
    //   typeof data.image_3 !== "string"
    // ) {
    //   formData.append(
    //     `image_3`,
    //     data.image_3 instanceof File ? data.image_3 : ""
    //   );
    // }
    handleUpdateReviewFn(formData);
  };

  const handleAddReview = (data: ReviewType) => {
    const formData = new FormData();
    formData.append("ordered_product", `${id}`);
    formData.append("rating", `${data.rating}`);
    formData.append("description", `${data.description}`);
    formData.append("is_approved", `true`);
    if (!!data.image_1 && data.image_1 instanceof File) {
      formData.append(`image_1`, data.image_1);
    }
    if (!!data.image_2 && data.image_2 instanceof File) {
      formData.append(`image_2`, data.image_2);
    }
    if (!!data.image_3 && data.image_3 instanceof File) {
      formData.append(`image_3`, data.image_3);
    }
    handleAddReviewFn(formData);
  };

  function handleReview(data: ReviewType) {
    if (!!review) {
      handleUpdateReview(data);
      console.log("Updated");
    } else {
      handleAddReview(data);
      console.log("Added");
    }
  }

  console.log("Preview", preview);

  useEffect(() => {
    if (!!review) {
      form.reset({
        description: review.description || "",
        rating: review.rating,
        image_1: review.image_1 ? null : undefined,
        image_2: review.image_2 ? null : undefined,
        image_3: review.image_3 ? null : undefined,
      });

      console.log("Image", review);

      setPreview([
        review.image_1 || "",
        review.image_2 || "",
        review.image_3 || "",
      ]);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="bg-whited mt-auto">
          Review
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Review Product</DialogTitle>
          <DialogDescription>
            You can provide your review on the product
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleReview)}
            className="w-full space-y-3"
            id="product-review"
          >
            <Label>Product Review</Label>
            <Ratings form={form} />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Write your product review here..."
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>You can add the images.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label className="font-semibold">
                Product Images
                <span className="text-brand"> (Optional)</span>
              </Label>
              <div className="flex items-center gap-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <FormField
                    key={`refund-proof-image-${index}`}
                    control={form.control}
                    name={`image_${index + 1}` as "image_1"}
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <div>
                          <label
                            htmlFor={`refund-item-img-${index}`}
                            className="relative"
                          >
                            <Avatar
                              className={cn(
                                preview[index] ? "border" : "border-none",
                                "w-full rounded-lg"
                              )}
                            >
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
                            {!!preview[index] ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setPreview((prev) =>
                                    prev.filter((img, imgIndex) =>
                                      imgIndex === index ? "" : img
                                    )
                                  );
                                  form.setValue(
                                    `image_${index + 1}` as "image_1",
                                    undefined
                                  );
                                }}
                                className="w-5 h-5 rounded-full border bg-white flex items-center justify-center absolute -right-2 -top-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            ) : null}
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

            <div className="flex items-center gap-2 ml-auto">
              <Button
                className="max-w-fit w-full ml-auto"
                type="submit"
                form="product-review"
                isLoading={handleAddReviewFnLoader || handleAddUpdateFnLoader}
                disabled={handleAddReviewFnLoader || handleAddUpdateFnLoader}
              >
                {!!review ? "Update" : "Post"}
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

              {review?.id ? (
                <DeleteConfirmation
                  deleteTitle="Review"
                  id={review?.id}
                  tag="ordered-product-completed"
                  url="/review/user-review/"
                  btnText="Delete Review"
                />
              ) : null}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
