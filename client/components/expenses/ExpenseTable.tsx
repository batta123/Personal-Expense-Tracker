import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "./types";
import { Expense } from "./types";

interface Props {
  expenses: Expense[];
  onEdit: (exp: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, onEdit, onDelete }: Props) {
  if (!expenses.length) {
    return (
      <div className="text-sm text-muted-foreground">No expenses found</div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.date}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(e.amount)}
              </TableCell>
              <TableCell className="truncate max-w-[200px]">
                {e.notes}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(e)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(e.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
