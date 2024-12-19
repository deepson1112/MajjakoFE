"use client";

import { Button } from "./ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { VendorSignUp, vendorSignUpSchema } from "@/lib/validators/user";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import PasswordInput from "./ui/PasswordInput";
import { toast } from "sonner";

const VendorSignUpForm = () => {
  const router = useRouter();

  const form = useForm<VendorSignUp>({
    resolver: zodResolver(vendorSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      retype_password: "",
      first_name: "",
      last_name: "",
      restaurant_name: "",
      restaurant_license: new File([], ""),
    },
  });
  console.log("Form Validation", form.formState.errors);
  console.log("Form Watch", form.watch());

  const { mutate: registerUserFn, isLoading } = useMutation<
    Response,
    AxiosError,
    FormData
  >({
    mutationFn: async (payload) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/`,
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
      router.push("/info/activation-message");
      toast.success("Sucessfully registered user", {
        description: "Please check email to verify you account",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const registerVendor = (data: VendorSignUp) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("password", data.password);
    formData.append("retype_password", data.retype_password);
    formData.append("vendor_name", data.first_name);
    formData.append("role", "1");
    formData.append("restaurant_name", data.restaurant_name);
    formData.append("restaurant_license", data.restaurant_license);

    registerUserFn(formData);
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerVendor)}
          className="mt-10 py-4 px-8 shadow sm:rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="restaurant_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bussiness Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* <div>
              <FormLabel>Restaurant License</FormLabel>

              <Input type="file" />
            </div> */}
            <FormField
              control={form.control}
              name="restaurant_license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bussiness License</FormLabel>
                  <FormControl>
                    <Input
                      accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                      type="file"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            <PasswordInput
              form={form}
              label="Password"
              name="password"
              placeHolder="Enter your password"
            />

            {/* <FormField
              control={form.control}
              name="retype_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            <PasswordInput
              form={form}
              label="Confirm Password"
              name="retype_password"
              placeHolder="Enter confirm password"
            />
          </div>
          <div>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              className="mt-4 w-full sm:w-fit sm:px-8"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default VendorSignUpForm;
