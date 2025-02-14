"use client";

import React from "react";
import { Button, SetItem, TriSetItem } from "@/components/shared/components";
import { SetType } from "@/app/types/types";

interface Props {
  sequence: SetType[];
  setSequence: React.Dispatch<React.SetStateAction<SetType[]>>;
}

export function SetControls({ sequence, setSequence }: Props) {
  // Определяем следующий порядковый номер
  const getNextOrder = () => (sequence.length > 0 ? Math.max(...sequence.map((s) => s.order)) + 1 : 1);

  // Добавление нового сета
  const addSet = () => {
    setSequence((prev) => [
      ...prev,
      {
        type: "set",
        order: getNextOrder(),
        weight: 0,
        reps: 0,
        isTriSet: false,
        subSets: [],
      } as SetType,
    ]);
  };

  // Добавление нового трисета
  const addTriSet = () => {
    setSequence((prev) => [
      ...prev,
      {
        type: "triset",
        order: getNextOrder(),
        isTriSet: true,
        subSets: [
          {weight: 0, reps: 0, order: 1 },
          {weight: 0, reps: 0, order: 2 },
          {weight: 0, reps: 0, order: 3 },
        ],
      } as SetType,
    ]);
  };

  // Обновление элемента (сет или трисет)
  const updateItem = (updatedItem: SetType) => {
		setSequence((prev) =>
			prev.map((s) => (s.order === updatedItem.order ? updatedItem : s))
		);
	};
	

  return (
    <div className="space-y-4 w-full">
      {/* Отображение списка сетов и трисетов */}
      {sequence.length > 0 ? (
        sequence
          .sort((a, b) => a.order - b.order) // Сортируем по order
          .map((item) =>
            item.isTriSet ? (
              <TriSetItem key={item.order} data={item} onUpdate={updateItem} />
            ) : (
              <SetItem key={item.order} data={item} onUpdate={updateItem} />
            )
          )
      ) : (
        <p className="text-gray-500">No sets added yet.</p>
      )}

      {/* Кнопки добавления */}
      <div className="flex justify-between max-w-[430px] mx-auto">
        <Button className="flex-1 bg-gray-800 border border-green-500 text-green-500 h-12 mr-3" onClick={addSet}>
          + Set
        </Button>
        <Button className="flex-1 bg-gray-800 border border-green-500 text-green-500 h-12 ml-3" onClick={addTriSet}>
          + Tri-set
        </Button>
      </div>
    </div>
  );
}
