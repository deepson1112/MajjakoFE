import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import Image from "next/image";
import { VariationImageType } from "@/types/variationimage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { getImageData } from "@/lib/utils";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

interface GalleryViewProps {
  images: VariationImageType[] | undefined;
  uploadUrl: string;
  variation: string;
}
type imageType = {
  image: any;
};
export default function GalleryView({
  images,
  uploadUrl,
  variation,
}: GalleryViewProps) {
  const [preview, setPreview] = useState("");
  const form = useForm({
    defaultValues: {
      image: "",
    },
  });
  const { mutate: addImageMutationFn, isLoading: addImageMutationFnLoader } =
    useMutation({
      mutationFn: async (payload: FormData) => {
        const { data } = await axiosInstance.post(uploadUrl, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
      },
      onError: (err) => {
        toast.error("Cannot upload image", {
          description: "Please Try Again",
        });
      },
      onSuccess: (data) => {
        toast.success("Sucessfully Uploaded an Image", {});
        queryClient.invalidateQueries("variations_images");
        form.reset();
        setPreview("");
      },
    });
  const handleAddImage = (data: imageType) => {
    const formData = new FormData();
    const { image } = data;

    if (image instanceof File) {
      formData.append("image", image);
    }
    formData.append("variation", variation);
    addImageMutation(formData);
  };
  const addImageMutation = (formData: FormData) => {
    return addImageMutationFn(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="bg-brand hover:bg-orange-400 text-white w-[100px] pl-0 pr-2"
        >
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ScrollArea className="h-[60vh]">
          <DialogHeader>
            <DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddImage)}>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem className="gap-6 cursor-pointer">
                        <div>
                          <FormLabel>
                            <Avatar className=" w-full h-[167px] cursor-pointer rounded-lg">
                              <AvatarImage
                                src={preview}
                                className="object-center object-cover"
                              />
                              <AvatarFallback className="rounded-lg bg-white">
                                <div
                                  className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                                  id="dropzone"
                                >
                                  <div className="text-center">
                                    <Image
                                      className="mx-auto h-12 w-12"
                                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                      width={1000}
                                      height={1000}
                                      alt="lorem"
                                    />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer"
                                      >
                                        <span>
                                          Drag And Drop Anywhere Here To Upload
                                          The Image.
                                        </span>
                                      </label>
                                    </h3>
                                  </div>
                                </div>
                              </AvatarFallback>
                            </Avatar>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              className="sr-only"
                              {...rest}
                              accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                              onChange={(event) => {
                                console.log(event);
                                const { files, displayUrl } =
                                  getImageData(event);
                                setPreview(displayUrl);
                                onChange(
                                  event.target.files
                                    ? event.target.files[0]
                                    : null
                                );
                              }}
                            />
                          </FormControl>
                        </div>

                        {preview && (
                          <div className="flex gap-3">
                            <Button
                              disabled={addImageMutationFnLoader}
                              type="submit"
                            >
                              Upload
                            </Button>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </DialogTitle>
            <Separator />
          </DialogHeader>
          <section className="w-full py-6">
            <div className="grid gap-6">
              <p className="max-w-[700px] text-start text-muted-foreground text-sm">
                Upload from Media Library
              </p>
              {images ? (
                <div className="grid px-4 md:px-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {!!images.length &&
                    images.map((image, idx) => (
                      <div key={idx} className="relative h-24 w-24 group">
                        <Link
                          href="#"
                          className="absolute inset-0 z-10"
                          prefetch={false}
                        >
                          <span className="sr-only">View</span>
                        </Link>
                        <Image
                          fill
                          src={image.image}
                          alt={image.id}
                          blurDataURL={image.image}
                          placeholder="blur"
                          className="object-cover w-full overflow-hidden border rounded-lg aspect-square group-hover:opacity-80 transition-opacity"
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="py-6 md:py-16 w-full text-center">
                  No Previous Uploads Found 🙃
                </p>
              )}
              {images && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </section>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
