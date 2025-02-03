"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container, Title, Exercise } from "@/components/shared/components";
import { MoreVertical, Calendar } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutDay {
  id: number;
  date: string;
  exercises: Exercise[];
}

interface Workout {
  id: number;
  title: string;
  color: string;
  days: WorkoutDay[];
	exercises?: { id: number; name: string }[];
}

interface WorkoutClientProps {
  workout: Workout;
  workoutDay: WorkoutDay;
}

export default function WorkoutClient({ workout, workoutDay }: WorkoutClientProps) {
  const router = useRouter();
  const workoutDate = new Date(workoutDay.date);

  return (
    <Container className="w-full px-6 pt-20">
      {/* Верхняя панель с кнопками */}
      <div className="flex justify-between items-center mb-16">
        <button
          className="text-accentSoft text-base font-bold hover:underline"
          onClick={() => router.back()}
        >
          Done
        </button>
        <button className="flex items-center justify-center bg-bgSurface h-[34px] w-[34px] rounded-full">
          <MoreVertical size={20} className="text-accentSoft" />
        </button>
      </div>

      {/* Дата и заголовок */}
      <div className="mb-5 border-b border-customBorder pb-5">
        <div className="flex items-center text-muted mb-2">
          <Calendar size={18} className="mr-2" />
          <p>
            Workout Date:{" "}
            {workoutDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <Title text={workout.title} size="lg" className="font-bold" />
      </div>

      {/* Секция упражнений */}
      <div>
        {workoutDay.exercises.length > 0 ? (
          workoutDay.exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} sets={exercise.setGroup} workoutId={workout.id} />
          ))
        ) : (
          <p className="text-gray-500">No exercises available for this workout day.</p>
        )}
      </div>
    </Container>
  );
}
