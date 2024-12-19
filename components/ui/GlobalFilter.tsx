"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Bell, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { toast } from "sonner";
import { DepartmentComboboxFormProps } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/add-category/DepartmentComboBox";
import { Skeleton } from "./Skeleton";
import { cn, encodeFiltersToURLSafe } from "@/lib/utils";

interface SearchBazar {
  bazar: string;
}

interface SubCategory {
  id: number;
  category_name: string;
  category_slug: string;
  department: number;
}

const BazarSearch = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const searchCategory = searchParams.get("category");
  const bazar = searchParams.get("bazar");
  const [searchValue, setSearchValue] = useState(" ");
  const [hoverValue, setHoverValue] = useState<string | null>(null);

  const form = useForm<SearchBazar>({
    defaultValues: {
      bazar: "",
    },
  });

  const handleSearchBazar = (data: SearchBazar) => {
    router.push(`/bazar/products?bazar=${data.bazar}`);
  };

  useEffect(() => {
    form.reset({
      bazar: bazar || "",
    });
  }, [bazar]);

  const { data: categories, isLoading: categoriesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/category/`)
        .json<DepartmentComboboxFormProps[]>();
      return response;
    },
    queryKey: [`global-filter-vendor-department`],
    onError: (error) => {
      toast.error("Issue while fetching category", {
        description: "Please Try Again",
      });
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: subCategories, isLoading: subCategoriesLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/sub-category/`)
        .json<SubCategory[]>();
      return response;
    },
    queryKey: [`global-filter-vendor-subcategory`],
    onError: (error) => {
      toast.error("Issue while fetching subcategory", {
        description: "Please Try Again",
      });
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!searchCategory?.length) {
      setSearchValue(" ");
    }
  }, [searchCategory]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 max-w-sm lg:max-w-xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearchBazar)}>
          <FormField
            control={form.control}
            name="bazar"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="relative flex w-full mx-auto">
                      {categoriesLoader ? (
                        <Skeleton className="max-w-[150px] w-full" />
                      ) : (
                        <Select
                          open={open}
                          onOpenChange={(e) => {
                            if (e) setSearchValue(" ");
                            setOpen(e);
                          }}
                          onValueChange={(value) => {
                            setSearchValue(value);
                            const cata = `category=${value}`;
                            router.push(
                              `/bazar/products?dqs=${encodeFiltersToURLSafe(
                                cata
                              )}`
                            );
                          }}
                          value={searchValue}
                        >
                          <SelectTrigger className="max-w-[150px] w-full absolute inset-y-0 -left-0">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent
                            onMouseLeave={() => setHoverValue(null)}
                          >
                            <SelectGroup
                              className={cn(
                                "relative flex flex-row w-[500px] mx-auto ",
                                hoverValue ? "w-[500px]" : "w-[150px]"
                              )}
                            >
                              <div>
                                <SelectItem value={` `}>All</SelectItem>
                                {!!categories?.length
                                  ? categories.map((cat) => (
                                      <SelectItem
                                        value={`${cat.id}`}
                                        className="cursor-pointer"
                                        key={`global-category-filter-${cat.id}`}
                                        onMouseEnter={() =>
                                          setHoverValue(
                                            cat.id.toString() ?? null
                                          )
                                        }
                                      >
                                        {cat.department_name}
                                      </SelectItem>
                                    ))
                                  : null}
                              </div>

                              {hoverValue && (
                                <div className="w-1/2 py-8 fixed h-full overflow-y-auto right-0 bg-gray-100 p-2">
                                  <div>
                                    {!!subCategories?.length
                                      ? subCategories
                                          ?.filter(
                                            (subCat) =>
                                              subCat.department ===
                                              parseInt(hoverValue)
                                          )
                                          .map((subCat) => (
                                            <div
                                              className="relative flex w-full border-y border-white cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-slate-200"
                                              onClick={() => {
                                                setSearchValue(hoverValue);
                                                setOpen(false);
                                                const filters = `category=${subCat.department}&subcategory=${subCat.id}`;
                                                const encodedFilters =
                                                  encodeFiltersToURLSafe(
                                                    filters
                                                  );
                                                router.push(
                                                  `/bazar/products/?dqs=${encodedFilters}`
                                                );
                                                // router.push(
                                                //   // `/bazar/products/?category=${subCat.department}&subcategory=${subCat.id}`
                                                // );
                                              }}
                                              key={`global-category-filter-${subCat.id}`}
                                            >
                                              {subCat.category_name}
                                            </div>
                                          ))
                                      : null}
                                  </div>
                                </div>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}

                      <button className="absolute inset-y-0 right-3">
                        <Search className="w-6 h-6 my-auto" />
                      </button>

                      {!!form.watch("bazar").length ? (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-12"
                          onClick={(e) => {
                            form.reset({
                              bazar: "",
                            });
                            e.preventDefault();
                            e.stopPropagation();
                            inputRef.current?.focus();
                          }}
                        >
                          <X className="w-4 h-4 my-auto text-gray-500" />
                        </button>
                      ) : null}

                      <Input
                        className="bg-gray-100 border-none pl-40"
                        placeholder={`Search Bazar...`}
                        {...field}
                        ref={inputRef}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
};

export default BazarSearch;
