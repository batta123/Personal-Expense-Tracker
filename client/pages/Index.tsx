import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseFilters from "@/components/expenses/ExpenseFilters";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import CategoryPie from "@/components/expenses/CategoryPie";
import {
  DEFAULT_FILTERS,
  Expense,
  Filters,
  formatCurrency,
} from "@/components/expenses/types";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "@/components/expenses/storage";

function isInRange(date: string, from: string | null, to: string | null) {
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

function currentMonthBounds() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10);
  return { start, end };
}

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const filtered = useMemo(() => {
    return expenses
      .filter((e) =>
        filters.category === "All" ? true : e.category === filters.category,
      )
      .filter((e) => isInRange(e.date, filters.from, filters.to))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }, [expenses, filters]);

  const monthTotal = useMemo(() => {
    const { start, end } = currentMonthBounds();
    return expenses
      .filter((e) => e.date >= start && e.date <= end)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const recent = useMemo(
    () =>
      expenses
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 5),
    [expenses],
  );

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleSubmit = (data: {
    amount: number;
    category: Expense["category"];
    date: string;
    notes: string;
  }) => {
    if (editing) {
      const updated = updateExpense(editing.id, data);
      if (updated)
        setExpenses((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e)),
        );
    } else {
      const created = addExpense(data);
      setExpenses((prev) => [created, ...prev]);
    }
  };

  const handleEdit = (exp: Expense) => {
    setEditing(exp);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <section className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your spending, visualize categories, and manage expenses.
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Total This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(monthTotal)}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseFilters filters={filters} onChange={setFilters} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryPie expenses={filtered} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                expenses={filtered.slice(0, 10)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <ExpenseForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </main>
  );
}
