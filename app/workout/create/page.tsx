"use client";

import * as React from "react";
import { Button, Container, Input, Title } from "@/components/shared/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shared/components/ui/popover";
import { Plus, ChevronDown, Check, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Abs",
  "Forearms",
  "Cardio",
  "Full Body",
];

export default function NewWorkout() {
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [exercises, setExercises] = React.useState([{ id: Date.now(), name: "" }]);

  const toggleGroup = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group]
    );
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { id: Date.now(), name: "" }]);
  };

  const handleRemoveExercise = (id: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleExerciseChange = (id: number, value: string) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, name: value } : exercise
      )
    );
  };

  const formattedGroups = selectedGroups.join(" - ");

	const router = useRouter();

	const goBack = () => {
		router.back();
	}

  return (
    <Container className="w-full px-6 pt-20 space-y-7">
      {/* Cancel Button */}
      <Button 
				variant={"link"}
				className="text-accentSoft text-base font-bold px-0 mb-7"
				onClick={goBack}
				>
        Cancel
      </Button>

      {/* Title */}
      <Title text="New workout" size="md" className="font-extrabold" />

      {/* Muscle Groups */}
      <div className="relative w-full space-y-1">
        <label
          htmlFor="muscle-groups"
          className="block font-medium text-base text-muted pl-3"
        >
          Muscle Group(s)
        </label>
        <Popover>
				  {/* Триггер поповера */}
				  <PopoverTrigger asChild>
				    <button
				      id="muscle-groups"
				      className="w-full flex justify-between items-center px-6 py-4 text-lg rounded-[10px] bg-bgSurface text-primary font-bold focus:ring-2 focus:ring-offset-2 focus:ring-primary"
				    >
				      {formattedGroups || "Select muscle groups"}
				      <ChevronDown size={20} className="text-accentSoft ml-2" />
				    </button>
				  </PopoverTrigger>

				  {/* Контент поповера */}
				  <PopoverContent
				    className="w-[var(--radix-popper-anchor-width)] min-w-[300px] max-w-[430px] min-h-[346px] p-1 rounded-[10px] border-none bg-bgBase shadow-md max-h-60 overflow-y-auto"
				  >
				    {/* Список кнопок */}
				    {muscleGroups.map((group) => (
				      <button
				        key={group}
				        onClick={() => toggleGroup(group)}
				        className={cn(
				          "flex items-center justify-between border-b border-bgBase w-full px-4 py-3 text-lg font-medium hover:bg-bgMuted transition-all duration-150",
				          selectedGroups.includes(group)
				            ? "bg-bgMuted text-primary"
				            : "text-muted"
				        )}
				      >
				        {group}
				        {selectedGroups.includes(group) && (
				          <Check size={20} className="ml-2 text-accentSoft" />
				        )}
				      </button>
				    ))}
				  </PopoverContent>
				</Popover>
      </div>

      {/* Exercise Fields */}
      {exercises.map((exercise, index) => (
        <div key={exercise.id} className="w-full space-y-1">
          <label
            htmlFor={`exercise-${exercise.id}`}
            className="block font-medium text-base text-muted pl-3"
          >
            Exercise {index + 1}
          </label>
          <div className="relative flex items-center space-x-2">
            <Input
              id={`exercise-${exercise.id}`}
              type="text"
              placeholder="Write an exercise"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(exercise.id, e.target.value)}
              className="pl-4 bg-bgSurface border-transparent placeholder:text-primary font-bold"
            />
            {exercises.length > 1 && (
              <Button
                variant="destructive"
                size="icon"
                className="p-2"
                onClick={() => handleRemoveExercise(exercise.id)}
              >
                <Trash size={16} strokeWidth={3} className="text-muted" />
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Add Exercise Button */}
      <Button
        className="w-full flex items-center justify-center"
        onClick={handleAddExercise}
      >
        <Plus strokeWidth={2} size={20} />
        Add exercise
      </Button>

      {/* Create Button */}
			<div> 
      	<Button
      	  variant="accent"
					size={"accent"}
      	  className="w-full text-lg font-bold mt-10"
      	>
      	  Create
      	</Button>
			</div>
    </Container>
  );
}
