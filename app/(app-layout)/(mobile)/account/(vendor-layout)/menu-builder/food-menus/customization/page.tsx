import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  AddCustomizationTabContent,
  AddonOverViewTabContent,
} from "./TabsContent";
import { Suspense } from "react";

export default function CustomizationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="add-customization">
              Add Customization
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <AddonOverViewTabContent />
          </TabsContent>
          <TabsContent value="add-customization">
            <AddCustomizationTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
}
