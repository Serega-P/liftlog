import React from "react";
import { Set } from "@/components/shared/components";

export function TriSet({ triSet }: { triSet: { 
  set1: { weight: number; reps: number };
  set2: { weight: number; reps: number };
  set3: { weight: number; reps: number };
  subSets?: { weight: number; reps: number; order: number }[];
} }) {
  return (
    <div className="space-y-4">
      {/* Отображаем сабсеты для каждого сета в трисете */}
      {triSet.subSets && triSet.subSets.length > 0 && (
        <div className="space-y-2">
          {triSet.subSets.map((subSet, index) => (
            <div key={index}>
              <Set set={subSet} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
