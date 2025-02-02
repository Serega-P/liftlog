"use client";

import React, { useState } from "react";
import { TriSet } from "@/app/types/workouts";
import { Title, Button, Input } from "@/components/shared/components";
import { RefreshCcw, Check } from "lucide-react";

interface TriSetItemProps {
  data: TriSet;
  onUpdate: (updatedTriSet: TriSet) => void;
}

export const TriSetItem: React.FC<TriSetItemProps> = ({ data, onUpdate }) => {
  const [sets, setSets] = useState([
    { ...data.set1, weight: "", reps: "", isAutoFilled: false },
    { ...data.set2, weight: "", reps: "", isAutoFilled: false },
    { ...data.set3, weight: "", reps: "", isAutoFilled: false },
  ]);

  const handleInputChange = (index: number, field: "weight" | "reps", value: string) => {
    const updatedSets = sets.map((set, idx) => {
      if (idx === index) {
        return {
          ...set,
          [field]: value === "" ? "" : Number(value), // Обновляем только изменённое поле
          isAutoFilled: set.weight !== "" && set.reps !== "", // Проверяем, заполнены ли оба поля
        };
      }
      return set; // Не изменяем соседние поля
    });

    setSets(updatedSets);

    // Обновляем данные в родительском компоненте
    onUpdate({
      ...data,
      [`set${index + 1}`]: updatedSets[index],
    });
  };

  const handleRefreshClick = (index: number) => {
    const updatedSets = sets.map((set, idx) => {
      if (idx === index) {
        return {
          ...set,
          weight: data[`set${index + 1}`].weight || "",
          reps: data[`set${index + 1}`].reps || "",
          isAutoFilled: true,
        };
      }
      return set;
    });

    setSets(updatedSets);

    // Передаём обновлённые данные в родительский компонент
    onUpdate({
      ...data,
      [`set${index + 1}`]: updatedSets[index],
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
              placeholder={data[`set${index + 1}`].weight === "" ? "" : String(data[`set${index + 1}`].weight)} // Плейсхолдер из data
              value={set.weight === "" ? "" : String(set.weight)} // Пустое значение до ввода
              onChange={(e) => handleInputChange(index, "weight", e.target.value)}
              className="w-full max-w-[100px] bg-bgSurface border-transparent h-12 px-0 py-0 text-center text-3xl placeholder:text-muted text-primary font-medium"
            />
            <span className={`${set.isAutoFilled ? "text-primary" : "text-muted"} text-lg font-bold`}>kg</span>
          </div>

          {/* Поле для повторений */}
          <div className="flex items-center space-x-2 w-[40%]">
            <Input
              type="number"
              placeholder={data[`set${index + 1}`].reps === "" ? "" : String(data[`set${index + 1}`].reps)} // Плейсхолдер из data
              value={set.reps === "" ? "" : String(set.reps)} // Пустое значение до ввода
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
