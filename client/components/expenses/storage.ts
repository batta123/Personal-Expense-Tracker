import { Expense, ExpenseCategory } from "./types";

const STORAGE_KEY = "expenses_v1";

function readAll(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Expense[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((e) => ({ ...e }));
  } catch {
    return [];
  }
}

function writeAll(items: Expense[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getExpenses() {
  return readAll();
}

export function addExpense(input: {
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes: string;
}): Expense {
  const now = new Date().toISOString();
  const expense: Expense = {
    id: crypto.randomUUID(),
    amount: Number(input.amount),
    category: input.category,
    date: input.date,
    notes: input.notes.trim(),
    createdAt: now,
    updatedAt: now,
  };
  const all = readAll();
  all.unshift(expense);
  writeAll(all);
  return expense;
}

export function updateExpense(
  id: string,
  patch: Partial<Omit<Expense, "id" | "createdAt">>,
) {
  const all = readAll();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  const now = new Date().toISOString();
  const updated: Expense = { ...all[idx], ...patch, updatedAt: now };
  all[idx] = updated;
  writeAll(all);
  return updated;
}

export function deleteExpense(id: string) {
  const all = readAll();
  const next = all.filter((e) => e.id !== id);
  writeAll(next);
}
