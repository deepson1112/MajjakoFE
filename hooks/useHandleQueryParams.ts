import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

type QueryParamsHandler<T> = (params: T) => void;

export const useHandleQueryParams = <T>(handler: QueryParamsHandler<T>) => {
  const searchParams = useSearchParams();
  const isReady = !!searchParams;

  useEffect(() => {
    if (!isReady) return;

    const params = Object.fromEntries(searchParams.entries());
    handler(params as unknown as T);
  }, [isReady, searchParams, handler]);
};
