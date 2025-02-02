"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Button, SetItem, TriSetItem, Title } from "@/components/shared/components";
import { mockWorkouts } from "@/app/mock/workouts";
import { ExerciseSet, TriSet, Day, Exercise } from "@/app/types/workouts";

export default function WorkoutResultPage() {
  const router = useRouter();
  const { workoutId, exerciseId } = useParams();

  // Найти тренировку по ID
  const workout = useMemo(() => {
    return mockWorkouts.find((w) => w.id === parseInt(workoutId));
  }, [workoutId]);

  // Найти последний тренировочный день
  const lastDay: Day | undefined = workout?.days[workout?.days.length - 1];

  // Найти упражнение по ID
  const exercise: Exercise | undefined = lastDay?.exercises.find(
    (ex) => ex.id === parseInt(exerciseId)
  );

  // Состояние для текущих данных о сете/трисете
  const [sequence, setSequence] = useState(exercise?.sequence || []);

  if (!workout || !lastDay || !exercise) {
    return (
      <Container className="w-full">
        <h1 className="text-xl font-bold text-white">Workout or Exercise not found</h1>
        <Button onClick={() => router.push("/")}>Go Back</Button>
      </Container>
    );
  }

  // Добавить новый Set
  const addSet = () => {
    setSequence((prev) => [
      ...prev,
      {
        type: "set",
        data: {
          id: Date.now(),
          weight: "-",
          reps: "-",
        } as ExerciseSet,
      },
    ]);
  };

  // Добавить новый TriSet
  const addTriSet = () => {
    setSequence((prev) => [
      ...prev,
      {
        type: "triSet",
        data: {
          id: Date.now(),
          set1: { id: Date.now() + 1, weight: "-", reps: "-" },
          set2: { id: Date.now() + 2, weight: "-", reps: "-" },
          set3: { id: Date.now() + 3, weight: "-", reps: "-" },
        } as TriSet,
      },
    ]);
  };

  // Обновление конкретного элемента
  const updateSequenceItem = (index: number, updatedItem: typeof sequence[number]) => {
    setSequence((prev) => {
      const updatedSequence = [...prev];
      updatedSequence[index] = updatedItem;
      return updatedSequence;
    });
  };

  return (
    <Container className="w-full px-6 pt-20 space-y-7">
      {/* Верхняя часть с заголовком и кнопкой отмены */}
      <div className="flex flex-col items-start pb-2 border-b border-gray-700">
        <Button
          variant="link"
          className="text-accentSoft text-base font-bold px-0 mb-7"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Title text={exercise.name} size="lg" className="font-bold pb-2" />
      </div>

      {/* Список Set и TriSet */}
      <div className="space-y-4">
        {sequence.map((item, index) => {
          if (item.type === "set") {
            return (
              <SetItem
                key={item.data.id}
                data={item.data}
                onUpdate={(updatedSet) =>
                  updateSequenceItem(index, { type: "set", data: updatedSet })
                }
              />
            );
          }
          if (item.type === "triSet") {
            return (
              <TriSetItem
                key={item.data.id}
                data={item.data}
                onUpdate={(updatedTriSet) =>
                  updateSequenceItem(index, { type: "triSet", data: updatedTriSet })
                }
              />
            );
          }
          return null;
        })}
      </div>

      {/* Кнопки добавления Set и TriSet */}
      <div className="flex justify-between max-w-[430px] mx-auto">
        <Button
          className="flex-1 bg-gray-800 border border-green-500 text-green-500 h-12 mr-3"
          onClick={addSet}
        >
          + Set
        </Button>
        <Button
          className="flex-1 bg-gray-800 border border-green-500 text-green-500 h-12 ml-3"
          onClick={addTriSet}
        >
          + Tri-set
        </Button>
      </div>

      {/* Финальная кнопка */}
      <Button
        variant="accent"
        size={"lg"}
        className="w-full text-lg font-bold mt-10"
        onClick={() => {
          console.log("Saved data:", sequence);
          router.back();
        }}
      >
        Set a record
      </Button>
    </Container>
  );
}
