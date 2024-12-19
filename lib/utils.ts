import { type ClassValue, clsx } from "clsx";
import {
  format,
  formatDistanceToNowStrict,
  getDate,
  getMonth,
  getYear,
  parseISO,
} from "date-fns";
import React, { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
// @ts-ignore
import locale from "date-fns/locale/en-US";
import LZString from "lz-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeWord = (word: string) => {
  return !!word ? word[0]?.toUpperCase() + word.substring(1) : "";
};

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

// export function displayImageData(event: ChangeEvent<HTMLInputElement>) {
//   const dataTransfer = new DataTransfer();

//   Array.from(event!).forEach((image) => dataTransfer.items.add(image));

//   const files = dataTransfer.files;
//   const displayUrl = URL.createObjectURL(event[0]);

//   return { files, displayUrl };
// }
export const dateConvert = (dateValue: string | number) => {
  const date = new Date(dateValue);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
};

export function objectsAreEqual<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
type PlainObject = { [key: string]: any };

export const areArraysEqual = <T extends PlainObject>(
  arr1: T[],
  arr2: T[]
): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((obj1, index) => {
    const obj2 = arr2[index];
    return areObjectsEqual(obj1, obj2);
  });
};

const areObjectsEqual = (obj1: PlainObject, obj2: PlainObject): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(
    (key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  );
};

export const isoDateConverter = (isoDate: string) => {
  const date = parseISO(isoDate);

  const year = getYear(date);
  const month = getMonth(date) + 1;
  const day = getDate(date);
  return { year, month, day };
};

export const dateToTime = (dateString: string) => {
  const date = parseISO(dateString);

  const time = format(date, "HH:mm:ss");
  return time;
};

export const ToUtc = (dateStr: string) => {
  const date = new Date(dateStr);
  const isoString = date.toISOString();
  return isoString;
};

export const formattedDate = (dateString: string) => {
  const parsedDate = parseISO(dateString);
  const formattedDate = format(parsedDate, "dd MMM hh:mm a");
  return formattedDate;
};

export const isNullRenderer = (isNull: boolean, component: React.ReactNode) => {
  if (isNull) {
    return component;
  }
  return null;
};

export const taxCalculator = (final_price: number, tax_rate: number) => {
  const actual_price = (final_price * 100) / (100 + tax_rate);
  const tax_amount = actual_price * (tax_rate / 100);
  return [actual_price.toFixed(2), tax_amount.toFixed(2)];
};

export const postiveNumber: (value: string) => number = (value: string) => {
  const [first, second] = value.split("-");
  return Number(first) + Number(second);
};

export function removeDecimal(number: number) {
  if (number.toString().includes(".")) {
    return Math.trunc(number);
  }
  return number;
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function encodeFiltersToURLSafe(filters: string): string {
  // const jsonString = JSON.stringify(filters); // Convert filters to string
  console.log(filters);
  const compressed = LZString.compressToEncodedURIComponent(filters); // Compress and URL-safe encode
  return compressed;
}

export function decodeURLSafeToFilters(encodedString: string): string {
  const decompressed =
    LZString.decompressFromEncodedURIComponent(encodedString);
  if (!decompressed) {
    throw new Error("Failed to decode URL-safe string");
  }
  return decompressed;
}
// export function parseQueryString(
//   queryString: string
// ): Record<string, string | string[]> {
//   const pairs = queryString.split("&");
//   return pairs.reduce(
//     (acc: Record<string, string | string[]>, pair: string) => {
//       const [key, value] = pair.split("=");

//       const decodedKey = decodeURIComponent(key);
//       const decodedValue = decodeURIComponent(value);

//       if (decodedKey in acc) {
//         if (Array.isArray(acc[decodedKey])) {
//           (acc[decodedKey] as string[]).push(decodedValue);
//         } else {
//           acc[decodedKey] = [acc[decodedKey] as string, decodedValue];
//         }
//       } else {
//         acc[decodedKey] = decodedValue;
//       }

//       return acc;
//     },
//     {}
//   );
// }
export function parseQueryString(
  queryString: string
): Record<string, string[]> {
  const pairs = queryString.split("&");
  return pairs.reduce((acc: Record<string, string[]>, pair: string) => {
    const [key, value] = pair.split("=");

    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    if (acc[decodedKey]) {
      acc[decodedKey].push(decodedValue);
    } else {
      acc[decodedKey] = [decodedValue];
    }

    return acc;
  }, {});
}
