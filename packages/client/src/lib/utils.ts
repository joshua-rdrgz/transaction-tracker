import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type ReturnTypeLoader<T extends (...args: any) => any> = Awaited<
ReturnType<ReturnType<T>>
>;
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currency(num: number | string) {
  const amount = +num;
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return currency;
}
