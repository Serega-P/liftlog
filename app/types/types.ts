export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Пользователь
export interface UserType {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  verified?: string | null;
  workouts: WorkoutType[];
}

// Тренировка
export interface WorkoutType {
  id: number;
  title: string;
  color: string;
  userId: number;
  user: UserType;
  days: WorkoutDayType[];
}

// День тренировки
export interface WorkoutDayType {
  id: number;
  date: string;
  workoutId: number;
  workout: WorkoutType;
  exercises: ExerciseType[];
}

// Упражнение
export interface ExerciseType {
  id: number;
  name: string;
  workoutId: number;
  dayExercises: number;
	setGroup: SetGroupType[];
  workout: WorkoutType;
  dayExercise: WorkoutDayType;
}

// Группа сетов (может включать обычные сеты или трисеты)
export interface SetGroupType {
  id: number;
  exerciseId: number;
  exercise: ExerciseType;
  set: SetType[];
  triset: TrisetType[];
}

// Обычный сет
export interface SetType {
  id: number;
  type: string;
  setGroupId: number;
  exercise: SetGroupType;
  weight?: number | null;
  reps?: number | null;
}

// Трисет (набор из нескольких под-сетов)
export interface TrisetType {
  id: number;
  type: string;
  setGroupId: number;
  exercise: SetGroupType;
  subSets: SubSetType[];
}

// Под-сет для трисетов
export interface SubSetType {
  id: number;
  trisetId: number;
  triset: TrisetType;
  weight?: number | null;
  reps?: number | null;
  order: number;
}
