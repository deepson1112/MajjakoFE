import { api } from "@/lib/fetcher";
import React from "react";
import { useMutation, useQuery } from "react-query";
import ProductSkeleton from "./(products)/products/ProductSkeleton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingCart } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { AddWishList } from "./(products)/products/[subCategoryId]/[productId]/ProductWishlist";
import Price from "@/components/Price";
import { toast } from "sonner";
import { ProductShortResponse } from "./(products)/products/Products";

const CategoiresProduct = () => {
  const handleAddProductWishlist = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const payload = {
      special_request: null,
      receiver_name: null,
      active: true,
      retail_product_variation: id,
    };
    mutateAddProductWishlist(payload);
  };

  const { mutate: mutateAddProductWishlist, isLoading } = useMutation({
    mutationFn: async (payload: AddWishList) => {
      const response = await api()
        .post(payload, `/retail-wishlist/retail-wishlist/`)
        .json();
      return response;
    },
    onSuccess: () => {
      toast.success("Added to whislist");
      queryClient.invalidateQueries("retail-wishlists");
    },
    onError: (error: any) => {
      toast.error("Unable to categories product", {
        description: `${JSON.parse(error.message).message}`,
      });
    },
  });

  const { data: products, isLoading: productsLoader } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/retails/retail-product-list/`)
        .json<ProductShortResponse>();
      return response;
    },
    queryKey: ["retail-product-display"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return productsLoader ? (
    new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)
  ) : !!products?.results?.length ? (
    products.results?.slice(0, 8)?.map((product, idx) => (
      <Link
        className="group relative"
        key={product.id}
        href={`/bazar/products/${product.sub_category}/${product.id}/`}
      >
        <button
          onClick={(event) => handleAddProductWishlist(event, product.id)}
          className="group-hover:grid absolute top-4 right-4 z-[5] h-[44px] w-[44px] bg-white hidden place-items-center rounded-lg"
        >
          <Heart className="h-[22px] w-[22px]" />
        </button>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.default_image || ""}
            alt="product image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="group-hover:text-brand text-gray-700">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              <Price amount={product.price} />
            </p>
          </div>

          <Button>
            <ShoppingCart className="h-[24px] w-[24px]" />
          </Button>
        </div>
      </Link>
    ))
  ) : (
    <div className="relative col-span-full mt-5 w-full py-24 flex flex-col items-center justify-center">
      <Image
        src={"/search.png"}
        width={512}
        height={512}
        alt="filter-combination-not-found"
        className="aspect-square w-24 object-center"
      />
      <h3 className="font-semibold text-xl">No products found</h3>
      <p className="text-zinc-500 text-sm">
        We found no search results for these filters.
      </p>
    </div>
  );
};

export default CategoiresProduct;
