"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/Input";
import { Upload } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const SetUpPage = () => {
  const [preview, setPreview] = useState("");
  const form = useForm({
    mode: "onSubmit",
    // resolver: zodResolver(registerCircleSchemaClient),
  });

  function submitCircleRegistration(value: any) {}

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(submitCircleRegistration)}
      >
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xltext-gray-900 rounded-xl overflow-hidden">
          <h4 className="font-bold text-center mb-4">Quick Profile Set Up</h4>
          <div className="rounded-t-lg h-32 overflow-hidden">
            {/* <Image
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="cover-image"
              height={1080}
              width={1080}
            /> */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-start justify-start w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <FormField
              control={form.control}
              name="circle_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel className="group relative cursor-pointer">
                      <Avatar className="w-full h-32">
                        <AvatarImage
                          src={preview}
                          className="object-center object-cover"
                        />
                        <AvatarFallback className="bg-gray-100">
                          {<Icons.user className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="group-hover:opacity-100 opacity-0 absolute w-full h-full bottom-0 bg-white/75 duration-200 text-black flex justify-center items-center">
                        <Upload />
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="hidden"
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          {/* <RegisterForm /> */}
          <div className="text-center mt-2">
            <h2 className="font-semibold">Profile Picture</h2>
            <p className="text-gray-500">Edit Profile</p>
          </div>

          <div className="p-4 border-t mx-8 flex justify-end">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-xl"
              )}
              // className="w-1/2 block mx-auto rounded-full bg-brand hover:shadow-lg font-semibold text-white px-6 py-2"
            >
              Continue
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SetUpPage;
