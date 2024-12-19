import {
  Calendar,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Megaphone,
  MenuIcon,
  ShoppingBag,
  Ticket,
  Timer,
  LockKeyhole,
  Utensils,
  HeartHandshake,
  Store,
  Watch,
  List,
  Truck,
  Percent,
  Banknote,
  MessageSquare,
} from "lucide-react";

export const Backend_URL = "https://dvls.aayush-basnet.com.np";

export const navigation = [
  {
    href: "/account/dashboard",
    title: "Dashboard",
    icons: LayoutDashboard,
    role: [1],
    current: true,
  },
  {
    href: "/account/restaurant",
    title: "My Restaurant",
    icons: Utensils,
    role: [1],
    current: false,
  },
  {
    href: "/account/vendor-timeline",
    title: "Timelines",
    icons: Timer,
    role: [1],
    current: false,
  },
  {
    title: "Menu Builder",
    icons: MenuIcon,
    role: [1],
    href: "menu-builder",
    current: false,
    sub: [
      {
        title: "Categories",
        href: "/account/menu-builder/departments",
        checker: "categories",
      },
      {
        title: "Sub-Categoires",
        href: "/account/menu-builder/categories/modify-categories",
        checker: "sub-categories",
      },
      {
        title: "Food Items",
        href: "/account/menu-builder/food-menus/overview",
        checker: "food-menus",
      },
      {
        title: "Change Order",
        href: "/account/menu-builder/changeorder",
        checker: "change-order",
      },
    ],
  },
  {
    href: "/account/offers",
    title: "Offers & Marketing",
    icons: Megaphone,
    role: [1],
    current: false,
  },
  {
    href: "/account/opening-hours",
    title: "Opening Hours",
    icons: Calendar,
    role: [1],
    current: false,
  },
  {
    href: "/account/coupon",
    title: "Coupon",
    icons: Ticket,
    role: [1],
    current: false,
  },
  {
    href: "/account/my-order",
    title: "My Order",
    icons: ShoppingBag,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/my-loyality",
    title: "My Loyality",
    icons: HeartHandshake,
    role: [2],
    current: false,
  },
  {
    href: "/account/change-password",
    title: "Change Password",
    icons: LockKeyhole,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/loyality",
    title: "Loyality Points",
    icons: HeartHandshake,
    role: [1],
    current: false,
  },
  {
    href: "/account/orders",
    title: "Orders",
    icons: ListOrdered,
    role: [1],
    current: false,
  },
  {
    href: "/account/product-reviews",
    title: "Product Reviews",
    icons: MessageSquare,
    role: [1],
    current: false,
  },
  {
    href: "/account/vendor_order",
    title: "Vendor Orders",
    icons: List,
    role: [1],
    current: false,
  },
];

export const retailnavigation = [
  {
    href: "/account/retail/dashboard",
    title: "Dashboard",
    icons: LayoutDashboard,
    role: [1],
    isRetail: true,
    current: true,
  },
  {
    href: "/account/retail/business",
    title: "My Business",
    icons: Store,
    role: [1],
    current: false,
  },
  {
    title: "Manage Inventory",
    icons: MenuIcon,
    role: [1],
    href: "inventory",
    current: false,
    sub: [
      {
        title: "Categoires",
        href: "/account/retail/inventory/departments",
        checker: "categories",
      },
      {
        title: "Sub-Categoires",
        href: "/account/retail/inventory/categories/modify-product-category",
        checker: "sub-categories",
      },
      // {
      //   title: "Variations",
      //   href: "/account/retail/inventory/variations",
      //   checker: "variations",
      // },
      {
        title: "Products",
        href: "/account/retail/inventory/products/view-products-new",
        checker: "products",
      },
      // {
      //   title: "Request Products",
      //   href: "/account/retail/inventory/request-product",
      //   checker: "products",
      // },
      {
        title: "Change Order",
        href: "/account/retail/inventory/change-order",
        checker: "change-order",
      },
    ],
  },
  {
    href: "/account/retail/offers",
    title: "Offers & Marketing",
    icons: Megaphone,
    role: [1],
    current: false,
  },
  {
    href: "/account/retail/coupon",
    title: "Coupon",
    icons: Ticket,
    role: [1],
    current: false,
  },
  {
    href: "/account/my-order",
    title: "My Order",
    icons: ShoppingBag,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/change-password",
    title: "Change Password",
    icons: LockKeyhole,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/retail/loyality",
    title: "Loyality Points",
    icons: HeartHandshake,
    role: [1],
    current: false,
  },
  {
    href: "/account/orders",
    title: "Orders",
    icons: ListOrdered,
    role: [1],
    current: false,
  },
  {
    href: "/account/product-reviews",
    title: "Product Reviews",
    icons: MessageSquare,
    role: [1],
    current: false,
  },
  {
    href: "/account/delivered",
    title: "Delivered",
    icons: Truck,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/retail/retail_orders",
    title: "Vendor Orders",
    icons: List,
    role: [1],
    current: false,
  },
];

export const userNavigation = [
  {
    href: "/account/my-order",
    title: "My Order",
    icons: ShoppingBag,
    role: [1, 2],
    current: false,
  },
  {
    href: "/account/my-loyality",
    title: "My Loyality",
    icons: HeartHandshake,
    role: [2],
    current: false,
  },
  {
    href: "/account/change-password",
    title: "Change Password",
    icons: LockKeyhole,
    role: [1, 2],
    current: false,
  },

  {
    href: "/account/delivered",
    title: "Delivered",
    icons: Truck,
    role: [1, 2],
    current: false,
  },
];

export const menuFoodTabNavigation = [
  {
    title: "Overview",
    value: "Overview",
    href: "/account/menu-builder/food-menus/overview",
    content: "/account/menu-builder/food-menus/overview",
  },
  {
    title: "View Items",
    value: "View Items",
    href: "/account/menu-builder/food-menus/view-items",
    content: "/account/menu-builder/food-menus/view-items",
  },
  {
    title: "Add Items",
    value: "Add Items",
    href: "/account/menu-builder/food-menus/add-items",
    content: "/account/menu-builder/food-menus/add-items",
  },
  {
    title: "Customization",
    value: "Customization",
    href: "/account/menu-builder/food-menus/customization",
    content: "/account/menu-builder/food-menus/customization",
  },
];

export const retailMenuFoodTabNavigation = [
  {
    title: "Overview",
    value: "Overview",
    href: "/account/retail/inventory/products/view-products-new",
    content: "/account/retail/inventory/products/view-products-new",
  },
  // {
  //   title: "View Products",
  //   value: "View Products",
  //   href: "/account/retail/inventory/products/view-products",
  //   content: "/account/retail/inventory/products/view-products",
  // },
  // {
  //   title: "Add Products",
  //   value: "Add Products",
  //   href: "/account/retail/inventory/products/add-products",
  //   content: "/account/retail/inventory/products/add-products",
  // },
  {
    title: "Add Products",
    value: "Add Products",
    href: "/account/retail/inventory/products/add-products-new",
    content: "/account/retail/inventory/products/add-products-new",
  },
  {
    title: "Variation",
    value: "Variation",
    href: "/account/retail/inventory/products/variations",
    content: "/account/retail/inventory/products/variations",
  },
];

export const menuCateogoryTabNavigation = [
  {
    title: "Modify Sub-Category",
    value: "Modify Sub-Category",
    href: "/account/menu-builder/categories/modify-categories",
    content: "/account/menu-builder/categories/modify-categories",
  },
  {
    title: "Add Sub-Category",
    value: "Add Sub-Category",
    href: "/account/menu-builder/categories/add-category",
    content: "/account/menu-builder/categories/add-category",
  },
];

export const retailMenuCateogoryTabNavigation = [
  {
    title: "Modify Sub-Category",
    value: "Modify Sub-Category",
    href: "/account/retail/inventory/categories/modify-product-category",
    content: "/account/retail/inventory/categories/modify-product-category",
  },
  {
    title: "Add Sub-Category",
    value: "Add Sub-Category",
    href: "/account/retail/inventory/categories/add-product-category",
    content: "/account/retail/inventory/categories/add-product-category",
  },
  {
    title: "Offer Sub-Category",
    value: "Offer Sub-Category",
    href: "/account/retail/inventory/categories/add-product-offer-category",
    content: "/account/retail/inventory/categories/add-product-offer-category",
  },
  {
    title: "View Offer Category",
    value: "View Offer Category",
    href: "/account/retail/inventory/categories/view-product-offer-category",
    content: "/account/retail/inventory/categories/view-product-offer-category",
  },
];

export const retailoffersTabsNavigation = [
  {
    title: "Percent Off",
    value: "Percent Off",
    href: "/account/retail/offers",
    content: "/account/retail/offers",
  },
  {
    title: "Buy 1 Get 1",
    value: "Buy 1 Get 1",
    href: "/account/retail/offers/buy-1-get-1",
    content: "/account/retail/offers/buy-1-get-1",
  },
  {
    title: "Save on Products",
    value: "Save on Products",
    href: "/account/retail/offers/save-on-products",
    content: "/account/retail/offers/save-on-products",
  },
  {
    title: "Platform Offer",
    value: "Platform Offer",
    href: "/account/retail/offers/platform-offer",
    content: "/account/retail/offers/platform-offer",
  },
];
export const offersTabsNavigation = [
  {
    title: "Percent Off",
    value: "Percent Off",
    href: "/account/offers",
    content: "/account/offers",
  },
  {
    title: "Buy 1 Get 1",
    value: "Buy 1 Get 1",
    href: "/account/offers/buy-1-get-1",
    content: "/account/offers/buy-1-get-1",
  },
  {
    title: "Save on Menu Items",
    value: "Save on Menu Items",
    href: "/account/offers/save-on-menu-items",
    content: "/account/offers/save-on-menu-items",
  },
];

export const colorCodes = [
  "#22c55e",
  "#0ea5e9",
  "#d946ef",
  "#f43f5e",
  "#19b7a0",
  "#8319b7",
  "#afb719",
  "#1a67d8",
  "#d81aa4",
  "#961ad8",
];

export const category = [
  {
    id: 1,
    name: "Food",
    href: "",
    image: "/category/salad.png",
  },
  {
    id: 8,
    name: "Beauty & Health",
    href: "",
    image: "/category/beauty.png",
  },
  {
    id: 2,
    name: "Drinks",
    href: "",
    image: "/category/drink.png",
  },
  {
    id: 3,
    name: "Clothings",
    href: "",
    image: "/category/clothing.png",
  },
  {
    id: 4,
    name: "Electornics & Gadgets",
    href: "",
    image: "/category/electronic.png",
  },
  {
    id: 5,
    name: "Vegetables",
    href: "",
    image: "/category/vegetable.png",
  },
  {
    id: 6,
    name: "Bakery",
    href: "",
    image: "/category/bakery.png",
  },

  {
    id: 7,
    name: "Sports & Outdoors",
    href: "",
    image: "/category/ball.png",
  },
];
export const availableTimeEnum = [
  "12:00 AM",
  "12:30 AM",
  "01:00 AM",
  "01:30 AM",
  "02:00 AM",
  "02:30 AM",
  "03:00 AM",
  "03:30 AM",
  "04:00 AM",
  "04:30 AM",
  "05:00 AM",
  "05:30 AM",
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];
export const imagearray = [
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per1-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per4-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/skin1-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per1-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per1-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per1-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/per4-400x400.jpg",
  },
  {
    image:
      "https://opencart4.magentech.com/themes/so_xtore/image/cache/catalog/demo/product/health-Beauty/foot5-400x400.jpg",
  },
];
export const brandimage = [
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png",
  },
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png",
  },
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png",
  },
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png",
  },
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png",
  },
  {
    image:
      "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png",
  },
];

export const bazarWishlistsNavigation = [
  {
    title: "Share",
    value: "Share",
    href: "/bazar/wishlists",
    content: "/bazar/wishlists",
  },
  {
    title: "Active",
    value: "Active",
    href: "/bazar/active-wishlists",
    content: "/bazar/active-wishlists",
  },
  {
    title: "Completed",
    value: "Compeeted",
    href: "/bazar/compeleted-wishlists",
    content: "/bazar/compeleted-wishlists",
  },
];

export const bazarDeliveredNavigation = [
  {
    title: "Delivered Items",
    value: "Delivered Items",
    href: "/account/delivered",
    content: "/account/delivered",
  },
  {
    title: "Refund Request",
    value: "Refund Request",
    href: "/account/refunded/",
    content: "/account/refunded/",
  },
];

export const RefundReasons = [
  {
    value: "Damaged item",
    name: "Damaged item",
  },
  {
    value: "Change of mind",
    name: "Change of mind",
  },
  {
    value: "Item does not match the description",
    name: "Item does not match the description",
  },
  {
    value: "Item doesn't fit",
    name: "Item doesn't fit",
  },
  {
    value: "Wrong item delivered",
    name: "Wrong item delivered",
  },
  {
    value: "Did not meet expectations",
    name: "Did not meet expectations",
  },
  {
    value: "Item arrived late",
    name: "Item arrived late",
  },
];
