// import React from "react";
// import { VendorDetails } from "@/types";
// import { Button } from "@/components/ui/Button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/Dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/Form";
// import { Pencil } from "lucide-react";
// import { useMutation } from "react-query";
// import { api } from "@/lib/fetcher";
// import { toast } from "@/components/ui/use-toast";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Input } from "@/components/ui/Input";

// type Props = {
//   vendor?: VendorDetails;
//   vendor_id?: String;
// };

// const vendorNameschema = z.object({
//   vendor_name: z.string().min(1, "Vendor Name is required!"),
// });

// export default function EditName({ vendor, vendor_id }: Props) {
//   const form = useForm<z.infer<typeof vendorNameschema>>({
//     resolver: zodResolver(vendorNameschema),
//     defaultValues: {},
//   });
//   const { mutate: handleEditResName, isLoading: handleEditResNameLoader } =
//     useMutation({
//       mutationFn: async (data: z.infer<typeof vendorNameschema>) => {
//         const response = await api()
//           .patch(data, `/vendor/vendor/${vendor_id}/`)
//           .json();
//         return response;
//       },
//       onSuccess: () => {
//         toast({
//           title: "Vendor Name has been Updated!!",
//         });
//       },
//       onError: () => {
//         toast({
//           title: "Error while changing vendor name",
//           variant: "destructive",
//         });
//       },
//     });
//   return !!vendor ? (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-inherit hover:bg-inherit text-center text-black rounded-md">
//           <Pencil className="h-5 w-5" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent
//         className="sm:max-w-[350px]"
//         onOpenAutoFocus={(e) => e.preventDefault()}
//       >
//         <DialogHeader>
//           <DialogTitle>Edit Your Restaurant Name</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit((data) => handleEditResName(data))}>
//             <div className="py-4 flex px-2 flex-col gap-3 h-[10vh]">
//               <div className="w-full px-3 flex flex-col md:flex-row gap-6">
//                 <FormField
//                   control={form.control}
//                   name="vendor_name"
//                   render={({ field }) => {
//                     return (
//                       <FormItem className="md:w-1/2">
//                         <FormLabel>Restaurant Name</FormLabel>
//                         <FormControl>
//                           <Input type="text" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     );
//                   }}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 type="submit"
//                 isLoading={handleEditResNameLoader}
//                 disabled={handleEditResNameLoader}
//               >
//                 Edit
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   ) : null;
// }
import React from "react";
import { VendorDetails } from "@/types";
import { Button } from "@/components/ui/Button";
import { DialogFooter } from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

type Props = {
  vendor?: VendorDetails;
  vendor_id?: String;
};

const vendorNameschema = z.object({
  vendor_name: z.string().min(1, "Vendor Name is required!"),
});

export default function EditName({ vendor, vendor_id }: Props) {
  const form = useForm<z.infer<typeof vendorNameschema>>({
    resolver: zodResolver(vendorNameschema),
    defaultValues: {},
  });
  const { mutate: handleEditResName, isLoading: handleEditResNameLoader } =
    useMutation({
      mutationFn: async (data: z.infer<typeof vendorNameschema>) => {
        const response = await api()
          .patch(data, `/vendor/vendor/${vendor_id}/`)
          .json();
        return response;
      },
      onSuccess: () => {
        toast.success("Vendor Name has been Updated!!", {
          description: "Refresh to see immediate updates",
        });
      },
      onError: (error: any) => {
        toast.error("Error while changing vendor name", {
          description: `${JSON.parse(error.message).message}`,
        });
      },
    });
  return !!vendor ? (
    <Form {...form}>
      <form
        className=" flex flex-row items-center"
        onSubmit={form.handleSubmit((data) => handleEditResName(data))}
      >
        <div className="py-4 flex px-2 flex-col gap-3">
          <div className="w-full px-3 gap-x-6">
            <FormField
              control={form.control}
              name="vendor_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        defaultValue={vendor?.vendor_name}
                        type="text"
                        className="text-brand w-[400px] my-4 font-semibold text-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            isLoading={handleEditResNameLoader}
            disabled={handleEditResNameLoader}
          >
            Edit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  ) : null;
}
