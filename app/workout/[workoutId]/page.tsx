import React from "react";
import { mockWorkouts } from "@/app/mock/workouts";
import WorkoutClient from "./WorkoutClient";

export default function WorkoutPage({ params }: { params: { workoutId: string } }) {
  const workout = mockWorkouts.find((w) => w.id === parseInt(params.workoutId));

  if (!workout || workout.days.length === 0) {
    return <div className="text-center text-gray-500">Workout not found or no days available.</div>;
  }

  // Получаем последний тренировочный день
  const lastDay = workout.days[workout.days.length - 1];

  return <WorkoutClient workout={workout} day={lastDay} />;
}
