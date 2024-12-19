"use client";
import ListLoader from "@/components/loaders/ListLoader";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { GripHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { api } from "@/lib/fetcher";
import useUser from "@/lib/useUser";
import { toast } from "sonner";

interface FoodItem {
  id: number;
  category_name: string;
  categories_order: number;
}

interface SubCateogry {
  categories_order: number;
  category_name: string;
  id: number;
}

const OrderChanger = ({ is_retail }: { is_retail?: boolean }) => {
  const { user } = useUser();
  const [foodOrderList, setFoodOrderlist] = useState<FoodItem[]>([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [dragCata, setDragCata] = useState(true);
  const [dragFood, setDragFood] = useState(false);
  const [foodOrderList1, setFoodOrderlist1] = useState([]);

  const handleDragEnd = (result: DropResult) => {
    if (data) {
      const [reorderedItem] = data.splice(result.source.index, 1);

      data.splice(result?.destination?.index!, 0, reorderedItem);

      const payload = data.map((item, index) => ({
        category_id: item.id,
        category_order: index + 1,
      }));
      handleSortOrder(payload);
    }
  };

  const { mutate: handleSortOrder } = useMutation({
    mutationFn: async (
      payload: Array<{ category_id: number; category_order: number }>
    ) => {
      const response = await api()
        .post(payload, "/menu/change-category-order/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully sorted");
    },
    onError: () => {
      toast.error("Unable to sorted", {
        description: "Please try again",
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-sub-categories/?vendor=${user?.vendor_id}`)
        .json<SubCateogry[]>();
      return response;
    },
    queryKey: ["food-items-list"],
    onSuccess: (data) => {
      setFoodOrderlist(data);
    },
    onError: (error) => {
      console.log("error", error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <ListLoader />;
  if (data) {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Overview</h2>

        <div className="relative">
          <Search className="absolute inset-y-0 w-6 h-6 my-auto left-3" />
          <Input
            className="bg-gray-100 border-none pl-12"
            placeholder={`Search ${data.length} items from list`}
          />
        </div>
        <div className="rounded-md mb-3 flex items-center justify-between p-2">
          <p className="font-medium text-muted-foreground">
            You can re-arrange the food list by draging and droping the list.
          </p>
          <Button disabled={!isOrderChanged}>Save Changes</Button>
        </div>
        <Select
          onValueChange={(e) => {
            if (e === "category") {
              setDragCata(true);
              setDragFood(false);
            } else {
              setDragCata(false);
              setDragFood(true);
            }
          }}
          defaultValue={"category"}
        >
          <SelectTrigger className="w-[180px] my-4">
            <SelectValue placeholder="Select Which to drag." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="food">
              {is_retail ? "Product" : "Food"}
            </SelectItem>
          </SelectContent>
        </Select>

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
                    isDragDisabled={!dragCata}
                  >
                    {(draggableProvider) => (
                      <li
                        className="bg-gray-100 flex flex-col active:ring active:ring-gray-500 p-3 px-6  items-between justify-between cursor-grab text-lg rounded-md"
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.draggableProps}
                        {...draggableProvider.dragHandleProps}
                      >
                        <div className="flex flex-row items-center justify-between gap-6">
                          <div className="flex items-center font-bold gap-4">
                            <GripHorizontal className="w-4 h-4  text-gray-700" />
                            {item.category_name}
                          </div>
                          <span className="text-xs ml-auto">
                            {item.categories_order}
                          </span>
                        </div>

                        <DragDropContext onDragEnd={() => {}}>
                          <Droppable droppableId={`${item.id}`}>
                            {(droppableProvider) => (
                              <ul
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}
                                className="flex flex-col ml-8 md:ml-16 rounded-sm gap-2"
                              >
                                {foodOrderList1[index] &&
                                  //@ts-ignore
                                  foodOrderList1[index].length > 0 &&
                                  //@ts-ignore
                                  foodOrderList1[index].map((items, i) => (
                                    <Draggable
                                      index={i}
                                      key={items.id}
                                      draggableId={`${items.id}`}
                                      isDragDisabled={!dragFood}
                                    >
                                      {(draggableProvider) => (
                                        <li
                                          className="bg-gray-100 active:ring active:ring-gray-500 p-3 px-6 flex items-center justify-between cursor-grab text-lg rounded-md"
                                          ref={draggableProvider.innerRef}
                                          {...draggableProvider.draggableProps}
                                          {...draggableProvider.dragHandleProps}
                                        >
                                          <div className="flex items-center gap-4">
                                            <GripHorizontal className="w-4 text-xs h-4 text-gray-700" />
                                            {items.food_title}
                                          </div>
                                          <span className="text-xs">
                                            {items.food_item_order}
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
  } else {
    return <p>Nothing To Change!!</p>;
  }
};

export default OrderChanger;
