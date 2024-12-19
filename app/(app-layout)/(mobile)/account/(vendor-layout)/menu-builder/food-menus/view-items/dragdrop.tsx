"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { GripHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
// import { FoodAddonType } from "./columns";

interface FoodItem {
  id: number;
  customization_title: string;
  food_title: string;
  food_addons_order: number;
}
interface ViewModalProps {
  items: ViewModalProps[];
}
const FoodOrder = ({ items }: ViewModalProps) => {
  console.log("xyz", items);
  const [foodOrderList, setFoodOrderlist] = useState<FoodItem[]>([]);
  console.log(foodOrderList);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/menu/change-order-of-customization/`
      );
      return response;
    },
    queryKey: ["change_customizations"],
    onSuccess: (data: any) => {
      setFoodOrderlist(data.data);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
  const filtereddata =
    foodOrderList &&
    foodOrderList.filter(
      //@ts-ignore
      (item) => item.customization_title === items.add_on_category
    );
  console.log("THis si fitered data", filtereddata);
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const id = filtereddata[startIndex].id;
    const endIndex = result.destination.index;
    sendIndicesToServer(id, endIndex);
    const copyTodos = [...filtereddata];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setFoodOrderlist(copyTodos);
  };
  const sendIndicesToServer = async (id: number, endIndex: number) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/menu/change-order-of-customization/${id}/`,
        {
          food_addons_order: endIndex,
        }
      );
      if (response.status === 200) {
        return toast.success("Successfully Updated the order.");
      }
      return toast.error("Failed to Update the order", {
        description: "Please try again!!",
      });
    } catch (error) {
      toast.error("Failed to Update the order", {
        description: "Please try again!!",
      });
    }
  };

  if (isLoading) return <ListLoader />;

  return (
    filtereddata.length > 0 && (
      <div className="p-4 h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(droppableProvider) => (
              <ul
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
                className="flex flex-col rounded-sm gap-2"
              >
                {filtereddata.map((item, index) => (
                  <Draggable
                    index={index}
                    key={item.id}
                    draggableId={`${item.id}`}
                  >
                    {(draggableProvider) => (
                      <li
                        className="bg-gray-100 active:ring active:ring-gray-500 p-3 px-6 flex items-center justify-between cursor-grab text-lg rounded-md"
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.draggableProps}
                        {...draggableProvider.dragHandleProps}
                      >
                        <div className="flex text-sm items-center gap-4">
                          <GripHorizontal className="w-4 h-4 text-gray-700" />
                          {item.food_title}
                        </div>
                        <span className="ml-auto  text-sm text-gray-700">
                          {item.food_addons_order}
                        </span>
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvider.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  );
};

export default FoodOrder;
