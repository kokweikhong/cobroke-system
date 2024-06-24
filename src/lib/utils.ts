import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMinMaxValuesByPercentage(
  value: string,
  percentage: string,
  decimal: number
): [number, number] {
  const min = Number(value) - Number(value) * (Number(percentage) / 100);
  const max = Number(value) + Number(value) * (Number(percentage) / 100);
  return [Number(min.toFixed(decimal)), Number(max.toFixed(decimal))];
}
