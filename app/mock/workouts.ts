import { Workout } from "@/app/types/workouts";

export const mockWorkouts: Workout[] = [
  {
    id: 1, 
    title: "Back - Triceps",
    color: "#FF9500", 
    days: [
      {
        id: 1,
        date: "2025-01-02",
        exercises: [
          {
            id: 1,
            name: "Deadlift",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 90,
                  reps: 13,
                },
              },
              {
                type: "triSet", 
                data: {
                  id: 2,
                  set1: { id: 21, weight: 50, reps: 15 },
                  set2: { id: 22, weight: 55, reps: 12 },
                  set3: { id: 23, weight: 40, reps: 10 },
                },
              },
              {
                type: "set",
                data: {
                  id: 3,
                  weight: 120,
                  reps: 10,
                },
              },
            ],
          },
          {
            id: 2,
            name: "Triceps Barbell Press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 4,
                  weight: 80,
                  reps: 18,
                },
              },
              {
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 30, reps: 15 },
                  set2: { id: 32, weight: 25, reps: 12 },
                  set3: { id: 33, weight: 20, reps: 10 },
                },
              },
              {
                type: "set",
                data: {
                  id: 5,
                  weight: 85,
                  reps: 10,
                },
              },
            ],
          },
        ],
      },
      {
        id: 2,
        date: "2025-01-08",
        exercises: [
          {
            id: 3,
            name: "Pull-ups",
            sequence: [
							{
                type: "triSet",
                data: {
                  id: 4,
                  set1: { id: 1, weight: 38, reps: 18 },
                  set2: { id: 2, weight: 35, reps: 14 },
                  set3: { id: 3, weight: 30, reps: 12 },
                },
              },
              {
                type: "set",
                data: {
                  id: 6,
                  weight: 0,
                  reps: 15,
                },
              },
              {
                type: "set",
                data: {
                  id: 7,
                  weight: 0,
                  reps: 12,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Full Body",
    color: "#00C7BE",
    days: [
      {
        id: 1,
        date: "2025-01-03", // Дата тренировки
        exercises: [
          {
            id: 4, // Уникальный ID упражнения
            name: "Squats",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 100,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 2,
                  weight: 110,
                  reps: 10,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 50, reps: 19 },
                  set2: { id: 32, weight: 50, reps: 16 },
                  set3: { id: 33, weight: 45, reps: 12 },
                },
              },
            ],
          },
					{
            id: 5, // Уникальный ID упражнения
            name: "Bench press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 10,
                  weight: 90,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 11,
                  weight: 80,
                  reps: 10,
                },
              },
							{
                type: "set",
                data: {
                  id: 12,
                  weight: 85,
                  reps: 8,
                },
              },
            ],
          },
        ],
      },
			{
        id: 2,
        date: "2025-01-10", // Дата тренировки
        exercises: [
          {
            id: 1, // Уникальный ID упражнения
            name: "Squats",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 100,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 2,
                  weight: 110,
                  reps: 10,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 50, reps: 19 },
                  set2: { id: 32, weight: 50, reps: 16 },
                  set3: { id: 33, weight: 45, reps: 12 },
                },
              },
            ],
          },
					{
            id: 5, // Уникальный ID упражнения
            name: "Bench press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 10,
                  weight: 90,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 11,
                  weight: 80,
                  reps: 10,
                },
              },
							{
                type: "set",
                data: {
                  id: 12,
                  weight: 85,
                  reps: 8,
                },
              },
            ],
          },
        ],
      },
			{
        id: 3,
        date: "2025-01-15", // Дата тренировки
        exercises: [
          {
            id: 1, // Уникальный ID упражнения
            name: "Squats",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 100,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 2,
                  weight: 110,
                  reps: 10,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 50, reps: 19 },
                  set2: { id: 32, weight: 50, reps: 16 },
                  set3: { id: 33, weight: 45, reps: 12 },
                },
              },
            ],
          },
					{
            id: 5, // Уникальный ID упражнения
            name: "Bench press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 10,
                  weight: 90,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 11,
                  weight: 80,
                  reps: 10,
                },
              },
							{
                type: "set",
                data: {
                  id: 12,
                  weight: 85,
                  reps: 8,
                },
              },
            ],
          },
        ],
      },
			{
        id: 4,
        date: "2025-01-18", // Дата тренировки
        exercises: [
          {
            id: 1, // Уникальный ID упражнения
            name: "Squats",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 100,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 2,
                  weight: 110,
                  reps: 10,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 50, reps: 19 },
                  set2: { id: 32, weight: 50, reps: 16 },
                  set3: { id: 33, weight: 45, reps: 12 },
                },
              },
            ],
          },
					{
            id: 5, // Уникальный ID упражнения
            name: "Bench press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 10,
                  weight: 90,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 11,
                  weight: 80,
                  reps: 10,
                },
              },
							{
                type: "set",
                data: {
                  id: 12,
                  weight: 85,
                  reps: 8,
                },
              },
            ],
          },
        ],
      },
			{
        id: 5,
        date: "2025-01-20", // Дата тренировки
        exercises: [
          {
            id: 1, // Уникальный ID упражнения
            name: "Squats",
            sequence: [
              {
                type: "set",
                data: {
                  id: 1,
                  weight: 100,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 2,
                  weight: 110,
                  reps: 10,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 3,
                  set1: { id: 31, weight: 50, reps: 19 },
                  set2: { id: 32, weight: 50, reps: 16 },
                  set3: { id: 33, weight: 45, reps: 12 },
                },
              },
            ],
          },
					{
            id: 5, // Уникальный ID упражнения
            name: "Bench press",
            sequence: [
              {
                type: "set",
                data: {
                  id: 10,
                  weight: 90,
                  reps: 12,
                },
              },
              {
                type: "set",
                data: {
                  id: 11,
                  weight: 80,
                  reps: 10,
                },
              },
							{
                type: "set",
                data: {
                  id: 12,
                  weight: 85,
                  reps: 8,
                },
              },
            ],
          },
        ],
      },
    ],
  },
	{
    id: 3,
    title: "Full Body 2",
    color: "#34C759",
    days: [
      {
        id: 1,
        date: "2025-01-20",
        exercises: [
					{
            id: 1,
            name: "Bench press",
            sequence: [
							{
                type: "set",
                data: {
                  id: 1,
                  weight: 90,
                  reps: 12,
                },
              },
							{
                type: "triSet",
                data: {
                  id: 2,
                  set1: { id: 1, weight: 50, reps: 19 },
                  set2: { id: 2, weight: 50, reps: 16 },
                  set3: { id: 3, weight: 45, reps: 12 },
                },
              },
						],
          },
					
        ],
      },
    ],
  },
];
