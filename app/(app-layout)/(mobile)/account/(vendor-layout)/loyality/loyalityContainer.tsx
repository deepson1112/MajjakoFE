"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { LoyalityType } from "@/lib/validators/loyality";
import EmptyDepartment from "@/components/others/EmptyDepartment";
import ListLoader from "@/components/loaders/ListLoader";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";

const LoyalityContainer = () => {
  const { data: loyality, isLoading: loyalityloader } = useQuery({
    queryFn: async () => {
      const response = await api().get("/orders/orders").json<LoyalityType[]>();
      return response;
    },

    queryKey: ["loyality"],
  });
  //-------------------NOTE----------------------------
  /**This is function just to formate the date, We can delete this later after integrating api */
  function formatDate(date: Date) {
    const offset = -date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, "0");
    const offsetMinutes = (offset % 60).toString().padStart(2, "0");
    const offsetSign = offset < 0 ? "-" : "+";

    const formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      "T" +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0") +
      offsetSign +
      offsetHours +
      ":" +
      offsetMinutes;

    return formattedDate;
  }

  return (
    <div>
      {loyalityloader ? (
        <ListLoader />
      ) : !!loyality && !!loyality.length ? (
        <DataTable columns={columns} data={loyality} />
      ) : (
        <EmptyDepartment title="Loyality" />
      )}
    </div>
  );
};

export default LoyalityContainer;
