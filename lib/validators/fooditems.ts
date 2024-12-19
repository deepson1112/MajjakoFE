import { number, string, z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./user";

export const addonsSchema = z.object({
  title: z.string(),
  price: z.string(),
});

export const extraMenuSchema = z.object({
  id: z.number().optional(),
  add_on_category: z.string(),
  select_type: z.string(),
  minimum_quantity: z.string(),
  maximum_quantity: z.string(),
  multiple_selection: z.boolean().optional(),
  foodaddons_set: z.array(addonsSchema).optional(),
});

export const addFoodItemSchema = z.object({
  id: z.number().optional(),
  food_title: z.string().min(1, "Menu title is required!"),
  price: z.coerce.number(),
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
  description: z.string().optional(),
  vendor_categories: z.number().optional(),
  customization_titles: z.array(extraMenuSchema).optional(),
  hours_schedule: z.coerce.number().optional(),
});

const variationsSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  variations_image: z.array(z.string()),
});

const productVariationsSchema = z.object({
  id: z.string(),
  variation: z.array(variationsSchema),
});

const formattedProductVariationSchema = z.object({
  id: z.string().optional(),
  variation: z.array(z.string()),
  variations_image: z.array(z.string()),
  price: z.coerce.number(),
  sku: z.string(),
  stock_quantity: z.coerce.number(),
});

export const productSchema = z
  .object({
    id: z.number().optional(),
    category: z.string().min(1, "Category is Required"),
    description: z.string(),
    discountable: z.boolean().optional(),
    age_restriction: z.boolean().optional(),
    sub_category: z.string().min(1, "Sub-Category is required"),
    includesTax: z.boolean(),
    delivery_time: z.string().min(1, "Delivery time is required"),
    tax_rate: z
      .string()
      .optional()
      .nullable()
      // .transform((value) => value ?? null),
      .refine(
        (value) =>
          value === null || value === "" || parseFloat(value ?? "") >= 0,
        {
          message: "Tax rate cannot be negative",
        }
      )
      .transform((value) => {
        if (value === null || value === "") return null;
        const parsed = parseFloat(value ?? "");
        return isNaN(parsed) ? null : parsed;
      }),
    name: z
      .string()
      .min(1, "Product name is required")
      .min(2, "Product name should at least be 2 letter."),

    price: z.string().optional(),
    sku: z.string().optional(),
    stock_quantity: z.string().optional(),
    isProductSpecification: z.boolean().optional(),
    specifications: z
      .array(z.object({ field: z.string(), value: z.string() }))
      .optional(),
    refund: z.boolean().optional(),
    refund_policies: z.array(z.number()).min(1, "Refund policies is required"),
    isProductVariation: z.boolean().optional(),
    default_image: z.string().min(1, "One product's image is required."),
    image_1: z.any().optional(),
    image_2: z.any().optional(),
    image_3: z.any().optional(),
    image_4: z.any().optional(),
    variations: z.array(productVariationsSchema),
    products_variations: z.array(formattedProductVariationSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isProductVariation) {
      if (!data.price) {
        ctx.addIssue({
          path: ["price"],
          code: z.ZodIssueCode.custom,
          message: "Product's price is required.",
        });
      }
      if (!data.sku) {
        ctx.addIssue({
          path: ["sku"],
          code: z.ZodIssueCode.custom,
          message: "Product's SKU is required.",
        });
      }
      if (!data.stock_quantity) {
        ctx.addIssue({
          path: ["stock_quantity"],
          code: z.ZodIssueCode.custom,
          message: "Product's Stock Quantity is required.",
        });
      }
    }
    if (data.isProductVariation) {
      if (data.variations.length) {
        data.variations.forEach((productVariation, productIndex) => {
          productVariation.variation.forEach((variation, variationIndex) => {
            if (!variation.id) {
              ctx.addIssue({
                path: [
                  "variations",
                  productIndex,
                  "variation",
                  variationIndex,
                  "id",
                ],
                code: z.ZodIssueCode.custom,
                message: "Variation is required.",
              });
            }
          });
        });
      } else {
        ctx.addIssue({
          path: ["variations"],
          code: z.ZodIssueCode.custom,
          message: "Product's variation is required.",
        });
      }
    }
  });

export const categorySchema = z
  .object({
    id: z.number().optional(),
    category_name: z.string().min(1, "Category name is required"),
    cateogory_slug: z.string().optional(),
    tax_rate: z.string().optional(),
    tax_exempt: z.boolean().optional(),
    age_restriction: z.boolean().optional(),
    department: z.string().min(1, "Department is required"),
    vendor: z.string().optional(),
    active: z.boolean().optional(),
    category_description: z
      .string()
      .optional()
      .nullable()
      .transform((value) => value ?? null),
  })
  .refine(
    (data) =>
      (data.tax_exempt && data.tax_rate) || (!data.tax_exempt && !data.tax_rate)
        ? true
        : false,
    {
      message: "Please enter the tax amount if the option is yes",
      path: ["tax_rate"],
    }
  );

export const departmentSchema = z
  .object({
    id: z.number().optional(),
    department_name: z.string().min(1, "Department name is required!!"),
    tax_rate: z.coerce.number().optional(),
    tax_exempt: z.boolean().optional(),
    age_restriction: z.boolean(),
    vendor: z.number().optional().nullable(),
  })
  .refine(
    (data) =>
      (data.tax_exempt && data.tax_rate) || (!data.tax_exempt && !data.tax_rate)
        ? true
        : false,
    {
      message: "Please enter the tax amount if the option is yes",
      path: ["tax_rate"],
    }
  );

// export const productVariationSchema = z.object({
//   id: z.string().optional(),
//   product: z.string(),
//   description: z.string(),
//   stock_quantity: z.coerce.number(),
//   sku: z.string(),
//   price: z.coerce.number(),
//   variations_image: z.array(z.object({ value: z.any().optional() })),
//   variation: z.array(
//     z.object({
//       id: z.string().optional(),
//       variation_type: z.string(),
//       value: z.string(),
//     })
//   ),
// });
export const productVariationArraySchema = z.object({
  id: z.string().optional(),

  stock_quantity: z.coerce.number(),
  sku: z.string(),
  price: z.coerce.number(),
  variations_image: z.array(z.object({ value: z.any().optional() })),
  variation: z.array(
    z.object({
      id: z.string().optional(),
      variation_type: z.string(),
      value: z.string(),
    })
  ),
});

const variationCollectionsSchema = z.object({
  id: z.string(),
  name: z.string(),
  collections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      sku: z.string(),
      stock_quantity: z.string(),
      variations_image: z.array(z.string()),
      price: z.string(),
    })
  ),
});

export const productVariationSchema = z.object({
  variations: z.array(variationCollectionsSchema),
});
export const productVariationSchema2 = z.array(variationCollectionsSchema);

export const extraOptionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Option title is required!"),
  price: z.coerce.number(),
  description: z
    .string()
    .optional()
    .nullable()
    .transform((value) => value ?? null),
  secondary_customization: z.boolean().optional(),

  customization: z.coerce
    .number()
    .optional()
    .nullable()
    .transform((value) => value ?? null),
  multiple_selection: z.boolean().optional(),
  maximum_number: z.coerce.number().optional(),
});

export const extraOptionResponseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Option title is required!"),
  price: z.coerce.number(),
  description: z
    .string()
    .optional()
    .nullable()
    .transform((value) => value ?? null),
  secondary_customization: z.boolean().optional(),
  customization: extraOptionSchema,
  multiple_selection: z.boolean().optional(),
  maximum_number: z.coerce.number().optional(),
});

export const productVariationTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variation title is required!"),
  description: z
    .string()
    .optional()
    .nullable()
    .transform((value) => value ?? null),
});

export type Addon = z.infer<typeof addonsSchema>;
export type FoodItem = z.infer<typeof addFoodItemSchema>;
export type ExtraMenu = z.infer<typeof extraMenuSchema>;
export type Category = z.infer<typeof categorySchema>;
export type DepartmentType = z.infer<typeof departmentSchema>;
export type ExtraOptionType = z.infer<typeof extraOptionSchema>;
export type ExtraOptionResponseType = z.infer<typeof extraOptionResponseSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductVariation = z.infer<typeof productVariationSchema>;
export type ProductVariationType = z.infer<typeof productVariationTypeSchema>;
export type ProductVariation2 = z.infer<typeof productVariationSchema2>;
export type VariationCollections = z.infer<typeof variationCollectionsSchema>;

export interface foodItemResponse extends FoodItem {
  id: number;
  food_addons?: z.infer<typeof extraMenuSchema>[];
  created_at: string;
  updated_at: string;
}
