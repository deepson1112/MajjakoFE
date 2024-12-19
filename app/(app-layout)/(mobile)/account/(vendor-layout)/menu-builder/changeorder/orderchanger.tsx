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

interface Department {
  department_order: number;
  department_name: string;
  id: number;
}

const OrderChanger = ({ is_retail }: { is_retail?: boolean }) => {
  const { user } = useUser();
  const [foodOrderList, setFoodOrderlist] = useState<FoodItem[]>([]);
  const [departmentOrderList, setDepartmentOrderlist] = useState<Department[]>(
    []
  );
  const [currentOrderType, setCurrentOrderType] = useState("category");

  const handleDragEnd = (result: DropResult) => {
    if (currentOrderType === "category" && data) {
      const [reorderedItem] = data.splice(result.source.index, 1);

      data.splice(result?.destination?.index!, 0, reorderedItem);

      const payload = data.map((item, index) => ({
        category_id: item.id,
        category_order: index + 1,
      }));
      handleSortCategoryOrder(payload);
    }
    if (currentOrderType === "department" && department) {
      const [reorderedItem] = department.splice(result.source.index, 1);

      department.splice(result?.destination?.index!, 0, reorderedItem);

      const payload = department.map((item, index) => ({
        department_id: item.id,
        department_order: index + 1,
      }));
      handleSortDepartmentOrder(payload);
    }
  };

  const { mutate: handleSortCategoryOrder } = useMutation({
    mutationFn: async (
      payload: Array<{ category_id: number; category_order: number }>
    ) => {
      const response = await api()
        .post({ category_order: payload }, "/menu/change-category-order/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully sorted");
    },
    onError: () => {
      toast.error("Unable to sort list", {
        description: "Please try again",
      });
    },
  });
  const { mutate: handleSortDepartmentOrder } = useMutation({
    mutationFn: async (
      payload: Array<{ department_id: number; department_order: number }>
    ) => {
      const response = await api()
        .post({ department_order: payload }, "/menu/change-department-order/")
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Successfully sorted");
    },
    onError: () => {
      toast.error("Unable to sort list", {
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
    queryKey: [`vendor-category-${user?.vendor_id}`, user?.vendor_id],
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

  const { data: department, isLoading: departmentLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-categories/?vendor=${user?.vendor_id}`)
        .json<Department[]>();
      return response;
    },
    queryKey: [`vendor-department-${user?.vendor_id}`, user?.vendor_id],
    onSuccess: (data) => {
      setDepartmentOrderlist(data);
    },
    onError: (error) => {
      console.log("error", error);
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading || departmentLoader) return <ListLoader />;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Overview</h2>

      <div className="relative">
        <Search className="absolute inset-y-0 w-6 h-6 my-auto left-3" />
        <Input
          className="bg-gray-100 border-none pl-12"
          placeholder={`Search  items from list`}
        />
      </div>
      <div className="rounded-md mb-3 flex items-center justify-between p-2">
        <p className="font-medium text-muted-foreground">
          You can re-arrange the food list by draging and droping the list.
        </p>
      </div>
      <Select
        onValueChange={(e) => {
          setCurrentOrderType(e);
        }}
        defaultValue={"category"}
      >
        <SelectTrigger className="w-[180px] my-4">
          <SelectValue placeholder="Select Which to drag." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="category">Category</SelectItem>
          <SelectItem value="department">Department</SelectItem>
        </SelectContent>
      </Select>

      {currentOrderType === "category" && foodOrderList.length ? (
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
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvider.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div>No Items Available</div>
      )}

      {currentOrderType === "department" && departmentOrderList.length ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(droppableProvider) => (
              <ul
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
                className="flex flex-col rounded-sm gap-2"
              >
                {departmentOrderList.map((item, index) => (
                  <Draggable
                    index={index}
                    key={item.id}
                    draggableId={`${item.id}`}
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
                            {item.department_name}
                          </div>
                          <span className="text-xs ml-auto">
                            {item.department_order}
                          </span>
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
      ) : (
        <div>No items to change</div>
      )}
    </div>
  );
};

export default OrderChanger;
