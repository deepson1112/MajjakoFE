import {
  AddCustomizationTabContent,
  AddonOverViewTabContent,
} from "@/app/(app-layout)/(mobile)/account/(vendor-layout)/menu-builder/food-menus/customization/TabsContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Suspense } from "react";

export default function VariationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="add-variations">Add Variations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AddonOverViewTabContent is_retail />
          </TabsContent>
          <TabsContent value="add-variations">
            <AddCustomizationTabContent is_retail />
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
}
