"use client";

import React, { useState, useEffect } from "react";
import { TrisetType, SubSetType } from "@/app/types/types";
import { Title, Button, Input } from "@/components/shared/components";
import { RefreshCcw, Check } from "lucide-react";

interface Props {
  data: TrisetType;
  onUpdate: (updatedTriSet: TrisetType) => void;
}

export const TriSetItem: React.FC<Props> = ({ data, onUpdate }) => {
  const [sets, setSets] = useState<SubSetType[]>(
    data.subSets.map((set) => ({
      ...set,
      weight: "",
      reps: "",
      isAutoFilled: false,
      trisetId: data.id,
      triset: data,
      originalWeight: set.weight,
      originalReps: set.reps,
    }))
  );

  // ✅ Обновление только при реальном изменении данных
  useEffect(() => {
    if (JSON.stringify(sets) !== JSON.stringify(data.subSets)) {
      onUpdate({
        ...data,
        subSets: sets,
      });
    }
  }, [sets, onUpdate, data]);

  // ✅ Обработчик изменения ввода
  const handleInputChange = (index: number, field: "weight" | "reps", value: string) => {
		const updatedSets = sets.map((set, idx) => {
			if (idx === index) {
				const newValue = value === "" ? "" : Number(value);
				const updatedSet = {
					...set,
					[field]: newValue,
				};
	
				// 🔹 `isAutoFilled` проверяем после обновления полей
				updatedSet.isAutoFilled = updatedSet.weight !== "" && updatedSet.reps !== "";
	
				return updatedSet;
			}
			return set;
		});
	
		setSets(updatedSets);
	
		onUpdate({
			...data,
			subSets: updatedSets as SubSetType[],
		});
	};
	

  // ✅ Обновление значений по умолчанию
  const handleRefreshClick = (index: number) => {
		const updatedSets = sets.map((set, idx) => {
			if (idx === index) {
				return {
					...set,
					weight: set.originalWeight || "",
					reps: set.originalReps || "",
					isAutoFilled: true,
				};
			}
			return set;
		});
	
		setSets(updatedSets);
	
		onUpdate({
			...data,
			subSets: updatedSets as SubSetType[],
		});
	};
	

  return (
    <div className="w-full border-b border-customBorder pb-4 space-y-4">
      <div className="flex justify-start items-center space-x-5 mx-auto">
        <Title text="Tri-set" size="xs" />
      </div>

      {sets.map((input, index) => (
        <div key={input.id} className="flex items-center justify-between space-x-4 max-w-[430px] mx-auto">
          {/* Ввод веса */}
          <div className="flex items-center space-x-2 w-[40%]">
            <Input
              type="number"
              placeholder={String(input.originalWeight) || ""}
              value={input.weight}
              onChange={(e) => handleInputChange(index, "weight", e.target.value)}
              className="w-full max-w-[100px] bg-bgSurface border-transparent h-12 px-0 py-0 text-center text-3xl placeholder:text-muted text-primary font-medium"
            />
            <span className={input.isAutoFilled ? "text-primary text-lg font-bold" : "text-muted text-lg font-bold"}>
              kg
            </span>
          </div>

          {/* Ввод повторений */}
          <div className="flex items-center space-x-2 w-[40%]">
            <Input
              type="number"
              placeholder={String(input.originalReps) || ""}
              value={input.reps}
              onChange={(e) => handleInputChange(index, "reps", e.target.value)}
              className="w-full max-w-[100px] bg-bgSurface border-transparent h-12 px-0 py-0 text-center text-3xl placeholder:text-muted text-primary font-medium"
            />
            <span className={input.isAutoFilled ? "text-primary text-lg font-bold" : "text-muted text-lg font-bold"}>
              reps
            </span>
          </div>

          {/* Кнопка обновления */}
          <div className="flex items-center justify-center w-[20%]">
            <Button
              variant="icons"
              size="icons"
              onClick={() => handleRefreshClick(index)}
              className="bg-none disabled:opacity-100 disabled:cursor-not-allowed"
              disabled={input.isAutoFilled} // ✅ Блокируем, если уже Check
            >
              {input.isAutoFilled ? (
                <Check size={28} strokeWidth={3} className="text-accentSoft" />
              ) : (
                <RefreshCcw size={28} strokeWidth={2} />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
