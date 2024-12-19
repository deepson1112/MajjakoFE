import { useQuery } from "react-query";
import ProductRatings from "./ProductsRatings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { api } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/Skeleton";
import { capitalizeWord, cn, formatTimeToNow } from "@/lib/utils";
import { Reply } from "lucide-react";
import Image from "next/image";

interface ReviewsProps {
  id: number;
}

type Review = {
  created_date: string;
  description: string;
  id: number;
  image_1: string;
  image_2: string;
  image_3: string;
  is_approved: boolean;
  product: number;
  rating: number;
  reply: string;
  updated_date: string;
  vendor_name: string;
  user: {
    first_name: string;
    id: number;
    image: string | null;
    last_name: string;
    user_name: string;
  };
};

const Reviews = ({ id }: ReviewsProps) => {
  const { data: productReviews, isLoading: productReviewsLoading } = useQuery({
    queryFn: async () => {
      const response = await api()
        .get(`/review/review/?product=${id}`)
        .json<Review[]>();
      return response;
    },
    queryKey: [`product-review-${id}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="h-full py-8 space-y-6 w-full  border-r md:order-first ">
      {productReviewsLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={`product-review-lodaer-${index}`}
            className="h-8 w-full"
          />
        ))
      ) : !!productReviews?.length ? (
        productReviews.map((review, index) => (
          <div
            key={`product-review-${review.id}`}
            className={cn(
              index === 0 ? "mt-0" : "pt-3 md:pt-5",
              "flex items-start gap-4 px-4 md:px-5"
            )}
          >
            <div className="md:flex w-16 h-16 bg-gray-100 rounded-full justify-start items-start gap-2.5 hidden">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/" alt="@shadcn" className="h-full w-full" />
                <AvatarFallback>{`${capitalizeWord(
                  review.user.first_name[0]
                )}`}</AvatarFallback>
              </Avatar>
            </div>

            <div className="w-full flex flex-col gap-5">
              <div className="flex items-start w-full">
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="md:hidden flex w-10 h-10 bg-gray-100 rounded-full justify-start items-start gap-2.5">
                      <Avatar className="w-full h-full">
                        <AvatarImage
                          src="/"
                          alt="@shadcn"
                          className="h-full w-full"
                        />
                        <AvatarFallback>{`${capitalizeWord(
                          review.user.first_name[0]
                        )}`}</AvatarFallback>
                      </Avatar>
                    </div>

                    <ProductRatings sm rating={review.rating || 0} />

                    <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                      {capitalizeWord(review.user.first_name)}{" "}
                      {capitalizeWord(review.user.last_name)}
                    </h5>

                    <span className="text-gray-500 text-xs font-normal leading-5">
                      {formatTimeToNow(review.created_date as unknown as Date)}
                    </span>
                  </div>

                  <div className=" flex-col justify-start items-start gap-1 inline-flex w-full rounded-lg">
                    <p className="text-[#5F6C72] font-normal leading-snug">
                      {capitalizeWord(review.description)}
                    </p>
                  </div>
                </div>
              </div>

              {!!review.image_1 || !!review.image_2 || !!review.image_3 ? (
                <div className="flex items-center gap-5">
                  {Array.from({ length: 3 }).map((_, index) =>
                    !!review[`image_${index + 1}` as "image_1"] ? (
                      <Image
                        key={`reivew-image-${index + 1}`}
                        className="aspect-square w-20 md:w-24 lg:w-28 object-center object-cover rounded-lg border"
                        src={review[`image_${index + 1}` as "image_1"]}
                        alt={`${review.product}-review-image-${index}`}
                        width={300}
                        height={300}
                      />
                    ) : null
                  )}
                </div>
              ) : null}

              {!!review.reply && !!review.reply.length ? (
                <div className="w-full space-y-3 pl-8 md:pl-12">
                  <div className="flex items-center gap-3">
                    <Reply />

                    <h6>
                      Reply from{" "}
                      <span className="font-semibold">
                        {review.vendor_name}
                      </span>
                    </h6>

                    <span className="text-gray-500 text-xs font-normal leading-5">
                      {formatTimeToNow(review.created_date as unknown as Date)}
                    </span>
                  </div>

                  <div className=" flex-col justify-start items-start gap-1 inline-flex bg-gray-100 w-full py-2  rounded-lg">
                    <p className="text-[#5F6C72] font-normal leading-snug px-4 py-2 border-l-4 border-brand">
                      {capitalizeWord(review.reply)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center py-36">
          <h6>No Reviews Available for this product.</h6>
        </div>
      )}
    </section>
  );
};

export default Reviews;
