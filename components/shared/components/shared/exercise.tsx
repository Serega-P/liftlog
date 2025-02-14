"use client";

import React, { useState } from "react";
import { Dumbbell, Settings2 } from "lucide-react";
import { ExerciseType, SetType } from "@/app/types/types";
import { 
	Button, 
	Set, 
	TriSet, 
	Title, 
	EditExerciseModal, 
	Dialog, 
	DialogContent, 
	DialogTrigger, 
	DialogTitle,
	DialogDescription,
} from "@/components/shared/components";

interface Props {
  exercise: ExerciseType;
  workoutId: number;
}

export function Exercise({ exercise, workoutId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState(exercise);
  const [sets, setSets] = useState<SetType[]>(() => 
  exercise.setGroup?.flatMap((group) => group.sets)?.sort((a, b) => a.order - b.order) || []
  );

  const handleUpdateExercise = (updatedSets: SetType[]) => {
		setExerciseData((prev) => ({
			...prev,
			setGroup: prev.setGroup.map((group) => ({
				...group,
				sets: updatedSets, // ✅ Обновляем сеты в правильной группе
			})),
		}));
	
		setSets(updatedSets); // ✅ Обновляем локальный стейт `sets`
		setIsOpen(false);
	};
	

		// console.log("sets:", sets);

  return (
    <div className="bg-bgBase rounded-[20px] text-primary mb-5">
      {/* Верхняя часть */}
      <div className="flex justify-between items-center border-b border-customBorder p-5">
        <div className="flex items-center gap-2">
          <Dumbbell size={26} className="text-accentSoft" />
          <Title text={exerciseData.name} size="sm" className="font-bold" />
        </div>
        <button className="text-muted">
          <Settings2 size={26} />
        </button>
      </div>

      {/* Список сетов и трисетов */}
      <div className="px-12 pb-5">
        {sets.map((set) => (
          <div key={set.order} className="py-2">
            {set.type === "set" && (
              <>
                <span className="font-base pb-2 text-muted">Set</span>
                <Set set={set} />
              </>
            )}

            {set.type === "triset" && (
              <>
                <span className="font-base pb-2 text-muted">Tri-set</span>
                <TriSet triSet={set} />
              </>
            )}
          </div>
        ))}

        {/* Кнопка открытия модального окна */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full font-bold uppercase text-base" variant="accent" onClick={() => setIsOpen(true)}>
              SET A NEW RECORD
            </Button>
          </DialogTrigger>
         
          <DialogContent className="custom-dialog w-full h-full min-h-svh max-w-none flex items-center justify-center border-none p-0">
            <DialogTitle className="sr-only">Edit Exercise</DialogTitle>
            <DialogDescription className="sr-only">
              Here you can edit your exercise details and set a new record.
            </DialogDescription>

            <EditExerciseModal name={exerciseData.name} sets={sets} onClose={() => setIsOpen(false)} onSave={handleUpdateExercise} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
