import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "@/lib/fetcher";
import { DepartmentType, departmentSchema } from "@/lib/validators/fooditems";
import { toast } from "sonner";

interface EditDepartment {
  items: DepartmentType;
}

export function EditDepartmentModal({ items }: EditDepartment) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const form = useForm<DepartmentType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      ...items,
    },
  });
  const watchTaxRate = form.watch("tax_exempt");

  const {
    mutate: handleUpdateDepartmentFn,
    isLoading: handleUpdateDepartmentFnLoader,
  } = useMutation({
    mutationFn: async (payload: DepartmentType) => {
      const data = api()
        .patch(payload, `/menu/vendor-department/${items.id}/`)
        .json();
      return data;
    },
    onSuccess: () => {
      toast.success("Sucessfully updated Department");
      queryClient.invalidateQueries("vendor-department");
      setIsEditModalOpen(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to Update Department", {
        description: "Please try again later",
      });
    },
  });

  const handleUpdateDepartment = (data: DepartmentType) => {
    handleUpdateDepartmentFn({ ...data });
    // console.log("Data", data);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full pl-0 pr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit department</DialogTitle>
          <DialogDescription>
            Make changes to your department here. Click save changes when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateDepartment)}
            className="py-4 flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="department_name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
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
              name="tax_exempt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tax Rate (Does the department includes tax?)
                  </FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e === "1" ? true : false);
                      e === "0" && form.setValue("tax_rate", undefined);
                    }}
                    defaultValue={field.value ? "1" : "0"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Does the department includes tax?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {watchTaxRate ? (
              <FormField
                control={form.control}
                name="tax_rate"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Tax percentage"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ) : null}
            <FormField
              control={form.control}
              name="age_restriction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Age Restriction</FormLabel>
                    <FormDescription>
                      Does the department have age restriction for certain age
                      group?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                isLoading={handleUpdateDepartmentFnLoader}
                disabled={handleUpdateDepartmentFnLoader}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
