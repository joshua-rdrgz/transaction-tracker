import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type ReturnTypeLoader<T extends (...args: any) => any> = Awaited<
ReturnType<ReturnType<T>>
>;
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
