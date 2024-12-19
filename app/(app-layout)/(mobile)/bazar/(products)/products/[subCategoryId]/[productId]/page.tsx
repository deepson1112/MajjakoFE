import { getProductDetail } from "@/app/(app-layout)/(mobile)/api/apiFetchServices";
import ProductPage from "./ProductPage";
import { Product } from "@/types";
interface ProductPageProps {
  params: {
    subCategoryId: string;
    productId: string;
  };
}

const SingleProduct = async ({ params }: ProductPageProps) => {
  const { productId } = params;
  const product = (await getProductDetail(productId)) as Product;

  return <ProductPage params={params} product={product} />;
};

export default SingleProduct;
[];
