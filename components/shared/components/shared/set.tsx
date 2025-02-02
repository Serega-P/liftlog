import React from "react";
import { ExerciseSet as SetType } from "@/app/types/workouts";

export function Set({ set }: { set: SetType }) {
  return (
    <div className="flex justify-start items-center border-b border-dashed border-customBorder">
      <div className="flex items-center">
        <p className="font-bold mr-2 text-2xl">{set.weight}</p>
				<p className="font-bold">kg</p>
      </div>

			<div className="flex items-center">
        <p className="text-muted mx-8">x</p>
      </div>

      <div className="flex items-center">
        <p className="font-bold mr-2 text-2xl">{set.reps}</p>
				<p className="font-bold">Reps</p>
      </div>
    </div>
  );
}
