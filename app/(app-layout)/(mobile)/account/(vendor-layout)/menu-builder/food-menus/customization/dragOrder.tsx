"use client";
import ListLoader from "@/components/loaders/ListLoader";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { FoodAddonType } from "./columns";
import { api } from "@/lib/fetcher";
import { AddonsActions } from "./AddonsActions";
import { ExtraOptionType } from "@/lib/validators/fooditems";

interface ViewModalProps {
  items: FoodAddonType;
  currentOptionState: ExtraOptionType[];
  setCurrentOptionState: Dispatch<SetStateAction<ExtraOptionType[]>>;
}
const CustomizationOrder = ({
  items,
  currentOptionState,
  setCurrentOptionState,
}: ViewModalProps) => {
  console.log("this is items", items);

  const [responseData, setResponseData] = useState<FoodAddonType[]>([]);
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/menu/add-food-customization-title/`)
        .json<FoodAddonType[]>();
      return response;
    },
    queryKey: ["food-addon-categories"],
    onSuccess: (data: FoodAddonType[]) => {
      console.log("This is what is", data);
      setResponseData(data);
      // setCurrentOptionState(data[0].customization_set);
    },
    onError: (error: Error) => {
      console.error(error);
    },
    refetchOnWindowFocus: false,
  });
  const filteredData =
    responseData &&
    responseData.filter(
      (item) => item.add_on_category === items.add_on_category
    );
  if (filteredData.length <= 0) return <ListLoader />;
  return (
    filteredData &&
    filteredData[0].customization_set && (
      <div className="p-4 h-full">
        <DragDropContext onDragEnd={() => {}}>
          <Droppable isDropDisabled droppableId="todos">
            {(droppableProvider) => (
              <ul
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
                className="flex flex-col rounded-sm gap-2"
              >
                {currentOptionState.map((item, index) => (
                  <Draggable
                    isDragDisabled
                    index={index}
                    key={index}
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
                          {item.title}
                        </div>
                        <span className="ml-auto  text-sm text-gray-700">
                          {item.price}
                        </span>
                        <div>
                          {/* @ts-ignore */}
                          <AddonsActions
                            //  @s-ignore
                            {...item}
                            currentOptionState={currentOptionState}
                            setCurrentOptionState={setCurrentOptionState}
                          />
                        </div>
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

export default CustomizationOrder;
