"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Set, TriSet, Title } from "@/components/shared/components";
import { Dumbbell, Settings2 } from "lucide-react";

// Интерфейсы для корректной типизации
interface SetType {
  id: number;
  weight?: number;
  reps?: number;
}

interface TriSetType {
  id: number;
  subSets?: { id: number; weight: number; reps: number; order: number }[];
}

interface SetGroupType {
  set?: SetType[];   // Могут быть сеты
  triset?: TriSetType[]; // Могут быть трисеты
}

interface ExerciseType {
  id: number;
  name: string;
  setGroup: SetGroupType[]; // Массив групп сетов или трисетов
}

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
        {exercise.setGroup.length > 0 ? (
          exercise.setGroup.map((group, index) => (
            <div key={index} className="py-2">
              {/* Отображение сетов */}
              {group.set && group.set.length > 0 && (
                <>
                  {group.set.map((set) => (
                    <div key={set.id} className="py-2">
                      <span className="font-base pb-2 text-muted">Set</span>
                      <Set set={set} />
                    </div>
                  ))}
                </>
              )}

              {/* Отображение трисетов */}
              {group.triset && group.triset.length > 0 && (
                <>
                  {group.triset.map((triSet) => (
                    <div key={triSet.id} className="py-2">
                      <span className="font-base pb-2 text-muted">Tri-set</span>
                      <TriSet triSet={triSet} />
                    </div>
                  ))}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No exercises available for this workout.</div>
        )}

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
