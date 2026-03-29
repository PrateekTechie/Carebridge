'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChecklistItem } from '@/lib/mock-data';

interface RecoveryChecklistProps {
  items: ChecklistItem[];
}

const categoryIcons: Record<string, string> = {
  exercise: '🏃',
  measurement: '📊',
  medication: '💊',
  other: '✓',
};

export function RecoveryChecklist({ items }: RecoveryChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.completed }), {})
  );

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completionRate = Math.round(
    (Object.values(checkedItems).filter(Boolean).length / items.length) * 100
  );

  const groupedItems = items.reduce(
    (acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  return (
    <Card className="card-hover bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle>Daily Recovery Checklist</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <span>{categoryIcons[category] || '✓'}</span>
              <span className="capitalize">{category}</span>
            </h4>

            <div className="space-y-2 pl-6">
              {categoryItems.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                >
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onChange={() => toggleItem(item.id)}
                    className="w-5 h-5"
                  />
                  <span
                    className={`text-sm transition-all ${
                      checkedItems[item.id]
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {item.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
