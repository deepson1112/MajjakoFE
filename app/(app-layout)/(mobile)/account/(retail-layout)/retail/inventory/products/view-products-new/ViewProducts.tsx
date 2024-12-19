import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CompletedProduct from "./CompletedProducts";
import InCompletedProduct from "./InCompleteProducts";

export function ViewProducts() {
  return (
    <Tabs defaultValue="completed" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
      </TabsList>
      <TabsContent value="completed">
        <CompletedProduct />
      </TabsContent>
      <TabsContent value="incomplete">
        <InCompletedProduct />
      </TabsContent>
    </Tabs>
  );
}
