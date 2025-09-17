import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { Expense, formatCurrency } from "./types";

const COLORS = [
  "#7C3AED",
  "#06B6D4",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#6366F1",
]; // modern palette

export default function CategoryPie({ expenses }: { expenses: Expense[] }) {
  const byCat = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No data for selected filters
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
