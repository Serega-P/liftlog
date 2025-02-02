import React from "react";
import { TriSet as TriSetType } from "@/app/types/workouts";
import { Set } from "@/components/shared/components";

export function TriSet({ triSet }: { triSet: TriSetType }) {
  return (
      <div className="space-y-2">
        <Set set={triSet.set1} />
        <Set set={triSet.set2} />
        <Set set={triSet.set3} />
      </div>
  );
}
