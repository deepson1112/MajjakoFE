import { useCallback, useState } from "react";
import { useHandleQueryParams } from "./useHandleQueryParams";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const parseValue = <T>(value: any): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
};

export const useQueryParamState = <T extends number | string>(
  key: string,
  defaultValue: T
) => {
  const [value, setValue] = useState<T>(defaultValue);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = useCallback(
    (newValue: T) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, String(newValue));
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [key, pathname, searchParams, router]
  );

  useHandleQueryParams<Record<string, T | undefined>>((params) => {
    if (params[key] === undefined) {
      return;
    }

    const newValue = parseValue<T>(params[key]);
    if (newValue === value) return;

    setValue(newValue);
  });

  return [value, onChange] as const;
};
