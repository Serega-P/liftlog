"use client";

import {
  Button,
  MyCalendar,
  Container,
  Title,
  WorkoutDay,
} from "@/components/shared/components";
import * as React from "react";
import {useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface WorkoutDay {
  id: number;
  date: string;
}

interface Workout {
  id: number;
  title: string;
  color: string;
  days: WorkoutDay[];
}

export default function Home() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

	useEffect(() => {
    fetch('/api/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error('Ошибка загрузки:', err));
  }, []);

  // Обработчик клика на кнопку Add Workout
  const handleAddWorkout = () => {
    router.push("/new-workout");
  };

	console.log(workouts)

  // Обработчик клика на день в календаре
  const handleCalendarClick = (date: string) => {
    const workoutDay = workouts
      .flatMap((workout) => workout.days)
      .find((day) => day.date === date);

    if (workoutDay) {
      router.push(`/workout/day/${workoutDay.id}`); // Переход на страницу дня тренировки
    }
  };

  // Обработчик клика на Workout
  const handleWorkoutClick = (id: number) => {
    router.push(`/workout/${id}`); // Переход на страницу тренировки
  };

  // Найти последнюю тренировку и отсортировать по давности
  const sortedWorkouts = React.useMemo(() => {
    const today = new Date();

    return [...workouts]
      .map((workout) => {
        // Найти последний тренировочный день
        const lastDay = workout.days.reduce((latest, currentDay) => {
          const currentDate = new Date(currentDay.date);
          return currentDate > new Date(latest.date) ? currentDay : latest;
        }, workout.days[0]);

        // Если тренировочных дней нет, указать null
        const daysAgo = lastDay
          ? Math.floor(
              (today.getTime() - new Date(lastDay.date).getTime()) /
              (1000 * 60 * 60 * 24)
            )
          : null;

        return {
          ...workout,
          lastDay,
          daysAgo,
        };
      })
      .sort((a, b) => {
        // Сортировать по давности: чем больше daysAgo, тем выше
        if (a.daysAgo === null) return 1; // Тренировки без дней идут в конец
        if (b.daysAgo === null) return -1;
        return b.daysAgo - a.daysAgo;
      });
  }, [workouts]);

  // Преобразование тренировок для календаря
  const events = workouts.flatMap((workout) =>
    workout.days.map((day) => ({
      date: day.date.split('T')[0],
      color: workout.color,
    }))
  );

  return (
    <>
      {/* Календарь */}
      <Container className="bg-bgBase pb-2.5 pt-5 rounded-b-2xl drop-shadow-3xl">
        <MyCalendar events={events} onDayClick={handleCalendarClick} />
      </Container>

      {/* Список тренировок */}
      <Container className="px-7 pt-10">
        <Title text="Workouts" size="lg" className="text-title font-bold mb-3" />
        {sortedWorkouts.map((workout) => {
          // Форматирование даты последней тренировки
          const date =
            workout.daysAgo !== null
              ? workout.daysAgo === 0
                ? "Today"
                : `${workout.daysAgo} day${workout.daysAgo > 1 ? "s" : ""} ago`
              : "No workouts yet";

          return (
            <WorkoutDay
              key={workout.id}
              workout={workout}
              id={workout.id}
              title={workout.title}
              color={workout.color}
              date={date}
              onClick={() => handleWorkoutClick(workout.id)}
            />
          );
        })}

        {/* Кнопка Add Workout */}
        <Button className={cn("w-full mb-6 mt-5")} onClick={handleAddWorkout}>
          <Plus strokeWidth={3} size={20} />
          Add Workout
        </Button>
      </Container>
    </>
  );
}
