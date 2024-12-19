"use client";

import wretch from "wretch";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useQuery } from "react-query";
import { UserEntity } from "@/types/models";
import { getUserProfileService } from "@/services/users.service";
import { api } from "./fetcher";
import { apiBase } from "./authUtils";

export interface IUserContext {
  user: UserEntity | null;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
  isLoading: boolean;
}

interface CurrencyResponse {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: {
    USD: string;
  };
}

const CurrenncyContext = createContext<IUserContext | null>(null);

export const CurrencyContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const { data: currency, isLoading } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get("/retail-marketplace/exchange-rate/")
        .json();
      return response;
    },
    queryKey: ["get-currency"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const values: IUserContext = { user, setUser, isLoading };
  return (
    <CurrenncyContext.Provider value={values}>
      {children}
    </CurrenncyContext.Provider>
  );
};

const useCurrency = () => {
  const context = useContext(CurrenncyContext);
  if (context === null) {
    throw new Error("User Context must be used inside UserContextProvider");
  }
  return context;
};

export default useCurrency;
