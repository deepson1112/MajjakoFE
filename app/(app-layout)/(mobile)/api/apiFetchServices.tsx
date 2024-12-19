import { OpeningHrType } from "@/lib/validators/openinghrs";

export async function getResturantsData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/?vendor_type=1`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getRestailsData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/?vendor_type=1`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getRetailVendors() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/?vendor_type=2`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getRetailersData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/?vendor_type=2`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getDiscountData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/menu/discount-vendor-category/`,
      {
        cache: "no-store",
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error("Server response:", res);
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch request timed out:", error.message);
      } else {
        console.error("Fetch error:", error.message);
      }
    } else {
      console.error("Fetch error:", error);
    }
  }
}
export async function getResturantsJSONData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/?format=json`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Vary: "Accept",
        },
      }
    );
    if (!res.ok) {
      throw new Error("fetcher:getResturantsJSONData--Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
export async function getResturantsOpeningData() {
  try {
    const date = new Date();
    const today = date.getDay();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/opening-hours/`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Vary: "Accept",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: OpeningHrType[] = await res.json();
    const filteredOpeningHour = data.filter(
      (x) => x.day!.toString() === today.toString()
    );
    const filteredOpeningHourNextDay = data.filter(
      (x) => x.day!.toString() === (today + 1).toString()
    );
    return {
      today: filteredOpeningHour,
      tomorrow: filteredOpeningHourNextDay,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getResturantsMenu(restaurant_id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/menu/user-vendor-category/?department=&vendor=${restaurant_id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

//api call for vendor-category
export async function getVendorCategories() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/menu/user-vendor-category/`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Vary: "Accept",
        },
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error("Server response:", res);
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch request timed out:", error.message);
      } else {
        console.error("Fetch error:", error.message);
      }
    } else {
      console.error("Fetch error:", error);
    }
  }
}
/**@func - getVendorCatagoryByID fetches the vendorcategory details by vedor_id */
export async function getVendorCatagoryByID(category_id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/menu/user-vendor-category/${category_id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

/**@func - getVendorByID fetches the vendor details by vedor_id */
export async function getVendorByID(vendorid: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/vendor/${vendorid}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
/**@func - getFoodByID fetches the single details by food_id */
export async function getFoodByID(foodid: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/menu/food/${foodid}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
/**@func - getOrderByID fetches the order details by order_id */
export async function getOrderByID(order_id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/orders/${order_id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBazarPageContents() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/homepage/content`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getFaqs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/faqs/`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProductDetail(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/retails/retail-products-display/${id}/`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
