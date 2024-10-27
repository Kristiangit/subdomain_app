import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RowData = {
  name: string;
  ssh_port: string;
  web_port: string;
  user_id: string;
  password: string;
};
