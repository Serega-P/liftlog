import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WorkoutType } from "@/app/types/types";

interface Props {
  workout: WorkoutType;
}

export const WorkoutDay: React.FC<Props> = ({ workout }) => {
  if (!workout) {
    console.error("Workout is undefined.");
    return null;
  }

  const { id, title, color, days } = workout;
	const lastDay = days.length - 1;

  const lastWorkoutDate = days.length > 0 ? new Date(days[days.length - 1].date) : null;
  const daysAgo = lastWorkoutDate
    ? Math.floor((new Date().getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Link
			href={`/workout/${id}/day/${lastDay}`}
      className="flex items-center justify-between w-full bg-bgSurface py-5 px-8 rounded-[10px] mb-5"
    >
      <div className="flex flex-col space-y-0 flex-1 max-w-[80%]">
        <div className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full mr-1"
            style={{ backgroundColor: color }}
          ></div>
          <p className="text-sm text-muted">
            {daysAgo !== null ? (daysAgo === 0 ? "Today" : `${daysAgo} days ago`) : "No workouts yet"}
          </p>
        </div>
        <h3 className="font-bold text-lg truncate">{title}</h3>
      </div>
      <div className="flex-shrink-0">
        <ChevronRight strokeWidth={2} className="text-accent" />
      </div>
    </Link>
  );
};

export default WorkoutDay;
