"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { GripHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface FoodItem {
  id: number;
  food_title: string;
  food_item_order: number;
}
const OverviewPage = () => {
  const [foodOrderList, setFoodOrderlist] = useState<FoodItem[]>([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = axiosInstance.get("/menu/change-food-order/");
      return response;
    },
    queryKey: ["food-items-list"],
    onSuccess: (data) => {
      setFoodOrderlist(data.data);
    },
    onError: (error) => {},
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const id = foodOrderList[startIndex].id;
    sendIndicesToServer(id, endIndex);
    const copyTodos = [...foodOrderList];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setFoodOrderlist(copyTodos);
  };
  const sendIndicesToServer = async (id: number, endIndex: number) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/menu/change-food-order/${id}/`,
        {
          food_item_order: endIndex,
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
  if (data?.data.length)
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Overview</h2>

        <div className="relative">
          <Search className="absolute inset-y-0 w-6 h-6 my-auto left-3" />
          <Input
            className="bg-gray-100 border-none pl-12"
            placeholder={`Search ${data.data.length} items from list`}
          />
        </div>
        <div className="rounded-md mb-3 flex items-center justify-between p-2">
          <p className="font-medium text-muted-foreground">
            You can re-arrange the food list by draging and droping the list.
          </p>
          <Button disabled={!isOrderChanged}>Save Changes</Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(droppableProvider) => (
              <ul
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
                className="flex flex-col rounded-sm gap-2"
              >
                {foodOrderList.map((item, index) => (
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
                        <div className="flex items-center gap-4">
                          <GripHorizontal className="w-4 h-4 text-gray-700" />
                          {item.food_title}
                        </div>
                        <span className="text-xs">{item.food_item_order}</span>
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
    );
};

export default OverviewPage;
