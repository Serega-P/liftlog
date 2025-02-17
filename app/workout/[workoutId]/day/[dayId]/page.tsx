"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton, Container, Title, Exercise, Button} from "@/components/shared/components";
import { MoreVertical, Calendar } from "lucide-react";
import { WorkoutType, ExerciseType } from "@/app/types/types";

export default function WorkoutDay({ params }: { params: { workoutId: number; } }) {
  const { workoutId } = params;
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`/api/workouts/${workoutId}`);
        if (!res.ok) throw new Error(`Failed to fetch workout: ${res.status}`);

        const data: WorkoutType = await res.json();
        setWorkout(data);

        if (data.days?.length) {
          setExercises(data.days[data.days.length - 1].exercises);
        } else if (data.exercises?.length) {
          setExercises(data.exercises);
        }
      } catch (error) {
        console.error("Ошибка загрузки тренировки:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkout();
  }, [workoutId]);

	const saveWorkout = async () => {
		try {
			const res = await fetch(`/api/workouts/${workoutId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ workoutId, exercises }),
			});
	
			if (!res.ok) throw new Error("Failed to save workout");
	
			const updatedWorkoutDay = await res.json();
			setWorkout((prev) =>
				prev ? { ...prev, days: [...prev.days, updatedWorkoutDay] } : prev
			);
			alert("Workout saved successfully!");
		} catch (error) {
			console.error("❌ Ошибка при сохранении тренировки:", error);
			console.error("Ошибка сохранения:", error);
			alert("Failed to save workout.");
		}
	};

  // ✅ Функция для обновления упражнения
  const updateExercise = (updatedExercise: ExerciseType) => {
	// console.log("updatedExercise NEW!:", updatedExercise)
    setExercises((prev) =>
      prev.map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise))
    );
  };

  if (isLoading) {
    return <Skeleton className="w-full h-20" />;
  }

  if (!workout) {
    return <div className="text-center text-gray-500">Workout not found.</div>;
  }

  return (
    <Container className="w-full px-6 pt-20">
      <div className="flex justify-between items-center mb-16">
        <button
          className="text-accentSoft text-base font-bold hover:underline"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className="flex items-center justify-center bg-bgSurface h-[34px] w-[34px] rounded-full">
          <MoreVertical size={20} className="text-accentSoft" />
        </button>
      </div>

      {/* Заголовок тренировки */}
      <div className="mb-5 border-b border-customBorder pb-5">
        {workout.days?.length ? (
          <div className="flex items-center text-muted mb-2">
            <Calendar size={18} className="mr-2" />
            <p>
              Workout Date:{" "}
              {new Date(workout.days[workout.days.length - 1].date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ) : (
          <p></p>
        )}

        <Title text={workout.title} size="lg" className="font-bold" />
      </div>

      {/* Упражнения */}
      <div>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} onUpdate={updateExercise} />
          ))
        ) : (
          <p className="text-gray-500">No exercises available.</p>
        )}
      </div>

			<Button
        className="mt-6 w-full font-bold uppercase text-base" 
				variant="accent"
				size="accent"
        onClick={saveWorkout}
      >
        Save Workout
      </Button>
    </Container>
        );
}
