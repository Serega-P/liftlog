"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Button, SetItem, TriSetItem, Title } from "@/components/shared/components";
import { ExerciseType, SetType, TrisetType } from "@/app/types/types";

interface Props {
  params: { workoutId: string; exerciseId: string };
}

export default function NewDay({ params }: Props) {
  const { workoutId, exerciseId } = params;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [exercise, setExercise] = useState<ExerciseType | null>(null);
  const [sequence, setSequence] = useState<(SetType | TrisetType)[]>([]);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        // Убираем лишнюю фигурную скобку, получаем workout по ID
        const response = await fetch(`/api/workouts/${Number(workoutId)}`);
        if (!response.ok) {
          const text = await response.text();
          console.error(`API Error ${response.status}:`, text);
          return;
        }
        const data = await response.json();

        // Если workout получен и содержит дни
        if (data && data.days && data.days.length > 0) {
          // Берём последний день (предполагается, что дни отсортированы по дате)
          const lastDay = data.days[data.days.length - 1];

          // Ищем упражнение с нужным ID в этом дне
          const exerciseFound = lastDay.exercises.find(
            (ex: any) => ex.id === Number(exerciseId)
          );

          if (!exerciseFound) {
            console.error("Exercise not found in the last day.");
            return;
          }

          // Устанавливаем найденное упражнение и его данные
          setExercise(exerciseFound);
          // Извлекаем сеты и трисеты из группы сетов упражнения
          const sets =
            exerciseFound.setGroup?.flatMap((group: any) => group.set || []) || [];
          const triSets =
            exerciseFound.setGroup?.flatMap((group: any) => group.triset || []) || [];
          setSequence([...sets, ...triSets]);
        } else {
          console.error("No days found in workout.");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [workoutId, exerciseId]);

  const addSet = () => {
    setSequence((prev) => [
      ...prev,
      { id: Date.now(), type: "set", weight: null, reps: null } as SetType,
    ]);
  };

  const addTriSet = () => {
    setSequence((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "triSet",
        subSets: [
          { id: Date.now() + 1, weight: null, reps: null, order: 1 },
          { id: Date.now() + 2, weight: null, reps: null, order: 2 },
          { id: Date.now() + 3, weight: null, reps: null, order: 3 },
        ],
      } as TrisetType,
    ]);
  };

  const saveWorkout = async () => {
    try {
      await fetch(`/api/workouts/${Number(workoutId)}/exercise/${Number(exerciseId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });
      router.back();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!exercise) return <p>Exercise not found!</p>;

  return (
    <Container className="w-full px-6 pt-20 space-y-7">
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

      <div className="space-y-4">
        <span>Sets</span>
        {sequence.map((item, index) =>
          item.type === "set" ? (
            <SetItem
              key={item.id}
              data={item}
              onUpdate={(updated) =>
                setSequence((prev) => prev.map((s, i) => (i === index ? updated : s)))
              }
            />
          ) : (
            <TriSetItem
              key={item.id}
              data={item}
              onUpdate={(updated) =>
                setSequence((prev) => prev.map((s, i) => (i === index ? updated : s)))
              }
            />
          )
        )}
      </div>

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

      <Button
        variant="accent"
        size="lg"
        className="w-full text-lg font-bold mt-10"
        onClick={saveWorkout}
      >
        Save Workout
      </Button>
    </Container>
  );
}
