"use client";

import React, { useEffect, useState } from "react";
import WorkoutClient from "./WorkoutClient";
import { Skeleton } from "@/components/shared/components";

interface Workout {
  id: number;
  title: string;
  color: string;
  days: { id: number; date: string }[];
}

export default function WorkoutPage({ params }: { params: { workoutId: number } }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`/api/workouts/${Number(params.workoutId)}`);
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error("Ошибка загрузки тренировки:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkout();
  }, [params.workoutId]);

  if (isLoading) {
    return <Skeleton className="w-full h-20" />;
  }

  if (!workout || !workout.days?.length) {
		return <div className="text-center text-gray-500">Workout not found or no days available.</div>;
	}
	
	const lastDay = workout.days[workout.days.length - 1];

	
	return <WorkoutClient workout={workout} workoutDay={lastDay} />;
	
}
