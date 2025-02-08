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
	exercises: ExerciseType[];
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
  exercise: ExerciseType | null;
  set: SetType[];
  triset: TrisetType[];
}

// Обычный сет
export interface SetType {
  id: number;
  type: string;
  setGroupId: number;
  exercise: ExerciseType ;
  weight?: number | string;
  reps?: number | string;
}

// Трисет (набор из нескольких под-сетов)
export interface TrisetType {
  id: number;
  type: string;
  setGroupId: number;
  exercise: ExerciseType;
  subSets: SubSetType[];
}

// Под-сет для трисетов
export interface SubSetType {
  id: number;
  trisetId: number;
  triset: TrisetType;
	isAutoFilled: boolean;
  weight?: number | string;
  reps?: number | string;
	originalWeight?: number | string;
	originalReps?: number | string;
  order: number;
}
