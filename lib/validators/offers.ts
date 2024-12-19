import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./user";

export const percentOffSchema = z
  .object({
    id: z.number().optional(),
    discount_banner: z.string().optional(),
    offer_name: z
      .string()
      .min(3, { message: "Offer name should be at least 3 letters" })
      .refine((data) => !!data, { message: "Offer name is required" }),
    discount_percentages: z.coerce
      .number()
      .positive("Invalid dicount percentage")
      .lte(100, "Discount cannot be more than 100%")
      .refine((val) => Number.isInteger(val), {
        message: "Discount percentage must be a number",
      }),
    minimum_spend_amount: z.coerce.number().gte(0, "Invalid amount"),
    maximum_redeem_value: z.coerce.number().gte(0, "Invalid amount").optional(),
    audience: z.string(),
    start_date: z.date().or(z.string()),
    end_date: z.date().or(z.string()),
    image: z
      .any()
      .optional()
      .refine(
        (files) => !files || files?.size <= MAX_FILE_SIZE,
        `Max file size is 10MB.`
      )
      .refine(
        (files) =>
          !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine(
    (data) => {
      return !!data.start_date || !!data.end_date;
    },
    {
      message: "Password do not match",
      path: ["amount"],
    }
  );

export const selectionCustomizationSchema = z.object({
  item: z.number().optional(),
  discount_percentages: z.string().optional(),
});

export const productSchema = z.object({
  id: z.number().optional(),
  discount_percentages: z.coerce.number().optional(),
  offerId: z.number().optional(),
});

export const entireCustomizationSchema = z.object({
  discount_percentages: z.string().optional(),
  category: z.number().optional(),
});

export const subCategorySchema = z.object({
  discount_percentages: z.coerce.number().optional(),
  id: z.number().optional(),
});

export const variationSchema = z.object({
  discount_percentages: z.coerce.number().optional(),
  id: z.number().optional(),
  offerId: z.number().optional(),
});

export type VariationSchemaType = z.infer<typeof variationSchema>;
export type EntireCustomization = z.infer<typeof entireCustomizationSchema>;
export type SelectionCustomization = z.infer<
  typeof selectionCustomizationSchema
>;

const OfferItemType = z.object({
  item: z.number().optional(),
  discount_percentages: z.number().optional(),
  store_offer: z.number().optional(),
  category: z.number().optional(),
  discount_on: z.string().optional(),
  id: z.number().optional(),
});

export const SaveOnMenuItemSchema = z.object({
  id: z.number().optional(),
  offer_name: z
    .string()
    .refine((data) => !!data, { message: "Offer name is required" }),
  type: z.enum(["selection", "entire"], {
    required_error: "You need to select a notification type.",
  }),
  weekly_spend: z.boolean().default(false).optional(),
  selectionCustomization: z.array(selectionCustomizationSchema).optional(),
  entireCustomization: z.array(entireCustomizationSchema).optional(),
  audience: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  offer_items: z.array(OfferItemType).optional(),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) =>
        !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export const SaveOnMenuItemRetailSchema = z
  .object({
    id: z.number().optional(),
    offer_name: z
      .string()
      .min(3, { message: "Offer name should be at least 3 letters" })
      .refine((data) => !!data, { message: "Offer name is required" }),
    type: z.enum(["product", "category", "offer-category", "variation"], {
      required_error: "You need to select a notification type.",
    }),
    retail_product: z.array(productSchema).optional(),
    sub_category: z.array(subCategorySchema).optional(),
    offer_category: z.array(subCategorySchema).optional(),
    retail_product_variation: z.array(variationSchema).optional(),
    audience: z.string(),
    start_date: z.any(),
    end_date: z.any(),
    offer_items: z.array(OfferItemType).optional(),
    image: z
      .any()
      .optional()
      .refine(
        (files) => !files || files?.size <= MAX_FILE_SIZE,
        `Max file size is 10MB.`
      )
      .refine(
        (files) =>
          !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine(
    (data) =>
      (!!data.offer_category && !!data.offer_category[0].id) ||
      (!!data.retail_product?.length && !!data.retail_product[0].id) ||
      (!!data.sub_category && !!data.sub_category[0].id) ||
      (!!data.retail_product_variation &&
        !!data.retail_product_variation[0].id),
    {
      message: "Select at least one item for offer",
      path: ["type"],
    }
  );
// .superRefine((data, ctx) => {
//   if (data.type === "product") {
//     data.retail_product?.forEach((product, productIndex) => {
//       if (!product.id) {
//         ctx.addIssue({
//           path: ["retail_product", productIndex, "id"],
//           code: z.ZodIssueCode.custom,
//           message: "product is required.",
//         });
//         if (!product.discount_percentages) {
//           if (Number(product.discount_percentages) === 0) {
//             ctx.addIssue({
//               path: ["retail_product", productIndex, "discount_percentages"],
//               code: z.ZodIssueCode.custom,
//               message: "Invalid discount percentage.",
//             });
//           }
//         }
//       }
//     });
//   }
// });

export const platformOfferSchema = z
  .object({
    id: z.number().optional(),
    offer_name: z
      .string()
      .min(3, { message: "Offer name should be at least 3 letters" })
      .refine((data) => !!data, { message: "Offer name is required" }),
    type: z.enum(["product", "category", "offer-category", "variation"], {
      required_error: "You need to select a notification type.",
    }),
    retail_product: z.array(productSchema).optional(),
    retail_product_variation: z.array(variationSchema).optional(),
    offer_items: z.array(OfferItemType).optional(),
    image: z
      .any()
      .optional()
      .refine(
        (files) => !files || files?.size <= MAX_FILE_SIZE,
        `Max file size is 10MB.`
      )
      .refine(
        (files) =>
          !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine(
    (data) =>
      (!!data.retail_product?.length && !!data.retail_product[0].id) ||
      (!!data.retail_product_variation &&
        !!data.retail_product_variation[0].id),
    {
      message: "Select at least one item for offer",
      path: ["type"],
    }
  );

export const BuyOneGetOneSchema = z.object({
  id: z.number().optional(),
  offer_name: z
    .string()
    .refine((data) => !!data, { message: "Offer name is required" }),
  type: z.enum(["selection", "entire"], {
    required_error: "You need to select a notification type.",
  }),
  item: z.array(z.number()),
  audience: z.string(),
  start_date: z.any(),
  end_date: z.any(),
  // offer_items: z.array(OfferItemType).optional(),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`
    )
    .refine(
      (files) =>
        !files || ACCEPTED_IMAGE_TYPES.includes(files?.type) || !!files,
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
// .refine(
//   (data) => !!data.offer_items && !!data.offer_items[0].id,

//   {
//     message: "Select at least one item for offer",
//     path: ["type"],
//   }
// );
export const couponCodeSchema = z.object({
  coupon: z.string(),
});

export type CouponCodeType = z.infer<typeof couponCodeSchema>;
export type PercentOffType = z.infer<typeof percentOffSchema>;
export type SaveOnMenuItemType = z.infer<typeof SaveOnMenuItemSchema>;
export type SaveOnMenuItemRetailType = z.infer<
  typeof SaveOnMenuItemRetailSchema
>;
export type BuyOneGetOneType = z.infer<typeof BuyOneGetOneSchema>;
export type PlatfromOfferType = z.infer<typeof platformOfferSchema>;
