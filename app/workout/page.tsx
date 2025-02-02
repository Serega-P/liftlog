"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter();


  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch("/api/workouts");
      const data = await response.json();
      setWorkouts(data);
    }
    fetchWorkouts();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/workout/${id}`);
  };

  return (
    <div>
      <h1>All Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id} onClick={() => handleClick(workout.id)}>
            {workout.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
