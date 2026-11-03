import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount) {
  if (amount === undefined || amount === null) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactNumber(number) {
  if (!number) return "0";
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
}

export function calculateSavings(mrp, price) {
  if (!mrp || !price || mrp <= price) return 0;
  return mrp - price;
}

