"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Set, TriSet, Title } from "@/components/shared/components";
import { Dumbbell, Settings2 } from "lucide-react";
import { ExerciseType } from "@/app/types/types";

interface Props {
  exercise: ExerciseType;
  workoutId: number;
  dayId: number;
}

export function Exercise({ exercise, workoutId }: Props) {
  const router = useRouter();

  return (
    <div className="bg-bgBase rounded-[20px] text-primary mb-5">
      {/* Верхняя часть: Иконка, заголовок и кнопка */}
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
        {exercise.setGroup?.map((group, index) => {
          const sets = Array.isArray(group.set) ? group.set : [];
          const trisets = Array.isArray(group.triset) ? group.triset : [];


          return (
            <div key={index} className="py-2">
              {/* Отображение сетов */}
              {sets.length > 0 && (
                <>
                  {sets.map((set) => (
                    <div key={set.id} className="py-2">
											<span className="font-base pb-2 text-muted">Set</span>
                      <Set set={set} />
                    </div>
                  ))}
                </>
              )}

              {/* Отображение трисетов */}
              {trisets.length > 0 && (
                <>
                  {trisets.map((triSet) => (
                    <div key={triSet.id} className="py-2">
											<span className="font-base pb-2 text-muted">Tri-set</span>
                      <TriSet triSet={triSet} />
                    </div>
                  ))}
                </>
              )}

              {/* Если нет ни одного сета или трисета */}
              {sets.length === 0 && trisets.length === 0 && (
                <div className="text-muted text-sm italic">No sets added yet.</div>
              )}
            </div>
          );
        })}
        <Button
          className="mt-6 w-full font-bold uppercase text-base"
          variant="accent"
          onClick={() => router.push(`/workout/${workoutId}/new-day/${exercise.id}`)}
        >
          SET A NEW RECORD
        </Button>
      </div>
    </div>
  );
}
