"use client";

import React, { useState } from "react";
import { TrisetType } from "@/app/types/types";
import { Title, Button, Input } from "@/components/shared/components";
import { RefreshCcw, Check } from "lucide-react";

interface TriSetItemProps {
  data: TrisetType;
  onUpdate: (updatedTriSet: TrisetType) => void;
}

export const TriSetItem: React.FC<TriSetItemProps> = ({ data, onUpdate }) => {
  // Инициализация `sets` из `data.subSets`
  const [sets, setSets] = useState(
    data.subSets.map((set) => ({
      ...set,
      isAutoFilled: false,
    }))
  );

  const handleInputChange = (index: number, field: "weight" | "reps", value: string) => {
    const updatedSets = sets.map((set, idx) =>
      idx === index
        ? { ...set, [field]: value === "" ? "" : Number(value), isAutoFilled: set.weight !== "" && set.reps !== "" }
        : set
    );

    setSets(updatedSets);

    // Обновляем родительский компонент
    onUpdate({
      ...data,
      subSets: updatedSets,
    });
  };

  const handleRefreshClick = (index: number) => {
    const updatedSets = sets.map((set, idx) =>
      idx === index
        ? {
            ...set,
            weight: data.subSets[index].weight || "",
            reps: data.subSets[index].reps || "",
            isAutoFilled: true,
          }
        : set
    );

    setSets(updatedSets);

    onUpdate({
      ...data,
      subSets: updatedSets,
    });
  };

  return (
    <div className="w-full border-b border-customBorder pb-4 space-y-4">
      {/* Заголовок */}
      <div className="flex justify-start items-center space-x-5 mx-auto">
        <Title text="Tri-set" size="xs" />
      </div>

      {/* Отображение всех 3 сетов */}
      {sets.map((set, index) => (
        <div key={set.id} className="flex items-center justify-between space-x-4 max-w-[430px] mx-auto">
          {/* Поле для веса */}
          <div className="flex items-center space-x-2 w-[40%]">
            <Input
              type="number"
              placeholder={data.subSets[index].weight ? String(data.subSets[index].weight) : ""}
              value={set.weight === "" ? "" : String(set.weight)}
              onChange={(e) => handleInputChange(index, "weight", e.target.value)}
              className="w-full max-w-[100px] bg-bgSurface border-transparent h-12 px-0 py-0 text-center text-3xl placeholder:text-muted text-primary font-medium"
            />
            <span className={`${set.isAutoFilled ? "text-primary" : "text-muted"} text-lg font-bold`}>kg</span>
          </div>

          {/* Поле для повторений */}
          <div className="flex items-center space-x-2 w-[40%]">
            <Input
              type="number"
              placeholder={data.subSets[index].reps ? String(data.subSets[index].reps) : ""}
              value={set.reps === "" ? "" : String(set.reps)}
              onChange={(e) => handleInputChange(index, "reps", e.target.value)}
              className="w-full max-w-[100px] bg-bgSurface border-transparent h-12 px-0 py-0 text-center text-3xl placeholder:text-muted text-primary font-medium"
            />
            <span className={`${set.isAutoFilled ? "text-primary" : "text-muted"} text-lg font-bold`}>reps</span>
          </div>

          {/* Кнопка Refresh/Check */}
          <div className="flex items-center justify-center w-[20%]">
            <Button
              variant="icons"
              size="icons"
              onClick={() => handleRefreshClick(index)}
              className="bg-none"
            >
              {set.isAutoFilled ? <Check size={28} strokeWidth={3} className="text-accentSoft" /> : <RefreshCcw size={28} strokeWidth={2} />}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
