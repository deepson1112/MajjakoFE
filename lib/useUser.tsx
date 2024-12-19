"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useQuery } from "react-query";
import { UserEntity } from "@/types/models";
import { getUserProfileService } from "@/services/users.service";

export interface IUserContext {
  user: UserEntity | null;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
  isLoading: boolean;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const { isLoading } = useQuery({
    queryFn: getUserProfileService,
    queryKey: ["user-profile"],
    onSuccess: (data) => {
      // queryClient.invalidateQueries([ApiRoutes.RESTAURANTS]);
      // localStorage.setItem("user", data?.data);
      setUser(data);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const values: IUserContext = { user, setUser, isLoading };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("User Context must be used inside UserContextProvider");
  }
  return context;
};

export default useUser;
