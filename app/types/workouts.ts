export interface ExerciseSet {
  id: number;
  weight: number | string; // Поддержка "-" для отсутствия значения
  reps: number | string;   // Поддержка "-" для отсутствия значения
}

export interface TriSet {
  id: number;
  set1: ExerciseSet;
  set2: ExerciseSet;
  set3: ExerciseSet;
}

export type SequenceItem =
  | { type: "set"; data: ExerciseSet }
  | { type: "triSet"; data: TriSet };

export interface Exercise {
  id: number;
  name: string;
  sequence: SequenceItem[];
}

export interface WorkoutDay {
  id: number;
  date: string; // Формат ISO (e.g., "2024-12-20")
  exercises: Exercise[];
}

export interface Workout {
  id: number;
  title: string;
  color: string; // Цвет для календаря
  days: WorkoutDay[];
}

export interface DayWithColor {
  date: Date;  // Дата, которую нужно подсветить
  color: string; // Цвет подсветки
}
