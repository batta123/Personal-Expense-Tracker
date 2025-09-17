export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Health"
  | "Entertainment"
  | "Others";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Others",
];

export interface Expense {
  id: string;
  amount: number; // in major currency units
  category: ExpenseCategory;
  date: string; // ISO string (yyyy-mm-dd)
  notes: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface Filters {
  category: ExpenseCategory | "All";
  from: string | null; // yyyy-mm-dd
  to: string | null; // yyyy-mm-dd
}

export const DEFAULT_FILTERS: Filters = {
  category: "All",
  from: null,
  to: null,
};

export const CURRENCY = "INR" as const;

export function formatCurrency(value: number, currency: string = CURRENCY) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
