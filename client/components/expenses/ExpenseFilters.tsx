import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES, ExpenseCategory, Filters } from "./types";

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
}

export default function ExpenseFilters({ filters, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card border rounded-lg p-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(v) => onChange({ ...filters, category: v as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {EXPENSE_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>From</Label>
        <Input
          type="date"
          value={filters.from ?? ""}
          onChange={(e) =>
            onChange({ ...filters, from: e.target.value || null })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>To</Label>
        <Input
          type="date"
          value={filters.to ?? ""}
          onChange={(e) => onChange({ ...filters, to: e.target.value || null })}
        />
      </div>

      <div className="flex items-end">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => onChange({ category: "All", from: null, to: null })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
