"use client";

import React from "react";
import { Exercise as ExerciseType } from "@/app/types/workouts";
import { useRouter } from "next/navigation";
import { Button, Set, TriSet, Title } from "@/components/shared/components";
import { Dumbbell, Settings2 } from "lucide-react";

export function Exercise({
  exercise,
  workoutId,
}: {
  exercise: ExerciseType;
  workoutId: number;
}) {
  const router = useRouter();

  return (
    <div className="bg-bgBase rounded-[20px] text-primary mb-5">
      {/* Верхняя часть: иконка, заголовок и кнопка */}
      <div className="flex justify-between items-center border-b border-customBorder p-5">
        <div className="flex items-center gap-2">
          <Dumbbell size={26} className="text-accentSoft" />
          <Title text={exercise.name} size="sm" className="font-bold" />
        </div>
        <button className="text-muted">
          <Settings2 size={26} />
        </button>
      </div>

      {/* Список сетов и трисетов */}
      <div className="px-12 pb-5">
        {exercise.sequence.map((item, index) => {
          if (item.type === "set") {
            return (
              <div key={index} className="py-2">
                <span className="font-base pb-2 text-muted">Set</span>
                <Set set={item.data} />
              </div>
            );
          }
          if (item.type === "triSet") {
            return (
              <div key={index} className="py-2">
                <span className="font-base pb-2 text-muted">Tri-set</span>
                <TriSet triSet={item.data} />
              </div>
            );
          }
          return null;
        })}

        {/* Кнопка внизу */}
        <Button
          className="mt-6 w-full font-bold uppercase text-base"
          variant={"accent"}
          onClick={() => {
            router.push(`/workout/${workoutId}/${exercise.id}/record`); // Переход на динамическую страницу
          }}
        >
          SET A NEW RECORD
        </Button>
      </div>
    </div>
  );
}
