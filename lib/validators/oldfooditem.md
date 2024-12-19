import { number, z } from "zod";
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

export const productSchema = z.object({
id: z.number().optional(),
category: z.string(),
description: z.string(),
discountable: z.boolean(),
age_restriction: z.boolean(),
sub_category: z.string(),
name: z.string(),
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

export const categorySchema = z.object({
id: z.number().optional(),
category_name: z.string().optional(),
cateogory_slug: z.string().optional(),
tax_rate: z.number().optional(),
tax_exempt: z.boolean().optional(),
age_restriction: z.boolean().optional(),
department: z.string().optional(),
vendor: z.string().optional(),
active: z.boolean().optional(),
description: z
.string()
.optional()
.nullable()
.transform((value) => value ?? null),
category_description: z
.string()
.optional()
.nullable()
.transform((value) => value ?? null),
hours_schedule: z.coerce.number().optional(),
});

export const departmentSchema = z
.object({
id: z.string().optional(),
department_name: z.string().min(1, "Department name is required!!"),
tax_rate: z.coerce.number().optional(),
tax_exempt: z.boolean().optional(),
age_restriction: z.boolean(),
hours_schedule: z.coerce.number().optional(),
vendor: z.string().optional(),
})
.refine(
(data) =>
(data.tax_exempt && data.tax_rate) || (!data.tax_exempt && !data.tax_rate)
? true
: false,
{
message: "please enter the tax amount if the option is yes",
path: ["tax_rate"],
}
);

export const productVariationSchema = z.object({
id: z.string().optional(),
description: z.string(),
stock_quantity: z.coerce.number(),
sku: z.string(),
price: z.coerce.number(),
product: z.string(),
variations_image: z.array(z.object({ value: z.any().optional() })),
variation: z.array(
z.object({
id: z.string().optional(),
variation_type: z.string(),
value: z.string(),
})
),
});

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

export type Addon = z.infer<typeof addonsSchema>;
export type FoodItem = z.infer<typeof addFoodItemSchema>;
export type ExtraMenu = z.infer<typeof extraMenuSchema>;
export type Category = z.infer<typeof categorySchema>;
export type DepartmentType = z.infer<typeof departmentSchema>;
export type ExtraOptionType = z.infer<typeof extraOptionSchema>;
export type ExtraOptionResponseType = z.infer<typeof extraOptionResponseSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductVariation = z.infer<typeof productVariationSchema>;

export interface foodItemResponse extends FoodItem {
id: number;
food_addons?: z.infer<typeof extraMenuSchema>[];
created_at: string;
updated_at: string;
}
