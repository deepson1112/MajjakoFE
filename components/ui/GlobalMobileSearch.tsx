"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Input } from "./Input";
import { Search, X } from "lucide-react";
import Sticky from "react-sticky-el";
import { cn, encodeFiltersToURLSafe } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import { DepartmentComboboxFormProps } from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/categories/add-category/DepartmentComboBox";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

const GlobalMobileSearch = () => {
  const router = useRouter();
  const currentRoute = usePathname();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState(" ");

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
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/bazar/products?bazar=${value}`);
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <Sticky
      stickyStyle={{
        zIndex: 50,
      }}
    >
      <form
        className={cn(
          currentRoute === "/" ? "hidden" : "block md:hidden",
          "relative w-full px-3 py-4 bg-brand rounded-b-lg"
        )}
        onSubmit={handleSearch}
      >
        <div className="relative">
          <Input
            type="text"
            required
            className="pl-40 outline-[0.5px] mx-0 bg-gray-50 rounded-2xl outline-none outline-brand !focus:outline-none placeholder:text-center pr-[120px]"
            placeholder={"I'm Searching for..."}
            onChange={handleChange}
            value={value}
            ref={inputRef}
          />
          <Select
            onValueChange={(value) => {
              setSearchValue(value);
              const cata = `category=${value}`;
              router.push(
                `/bazar/products?dqs=${encodeFiltersToURLSafe(cata)}`
              );
            }}
            value={searchValue}
          >
            <SelectTrigger
              className={cn(
                "line-clamp-1 absolute inset-y-0 left-0 h-full border-l border-gray-300 rounded-2xl",
                searchValue !== " " ? "w-[80px]" : "w-[40px]"
              )}
            >
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={` `}></SelectItem>
                {!!categories?.length
                  ? categories.map((cat) => (
                      <SelectItem
                        value={`${cat.id}`}
                        key={`global-category-filter-${cat.id}`}
                      >
                        {cat.department_name}
                      </SelectItem>
                    ))
                  : null}
              </SelectGroup>
            </SelectContent>
          </Select>

          {!!value.length ? (
            <button
              type="button"
              className="absolute inset-y-0 right-14"
              onClick={(e) => {
                setValue(" ");
                e.preventDefault();
                e.stopPropagation();
                inputRef.current?.focus();
              }}
            >
              <X className="w-4 h-4 my-auto text-gray-500" />
            </button>
          ) : null}

          <button
            type="submit"
            className="absolute right-6 top-[50%] translate-y-[-50%]"
          >
            <Search className="w-5 h-5 text-brand" strokeWidth={"2px"} />
          </button>
        </div>
      </form>
    </Sticky>
  );
};

export default GlobalMobileSearch;
