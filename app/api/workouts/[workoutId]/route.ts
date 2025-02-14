import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { workoutId: number } }) {
  try {
    const { workoutId } = params;
    const workout = await prisma.workout.findUnique({
      where: { id: Number(workoutId) },
      include: {
        days: {
          orderBy: { date: "desc" },
          take: 1,
          include: {
            exercises: {
              include: {
                setGroup: {
                  include: {
                    sets: {
                      orderBy: { order: "asc" }, // ✅ Упорядочиваем сеты
                      include: {
                        subSets: {
                          orderBy: { order: "asc" }, // ✅ Упорядочиваем сабсеты
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        exercises: true, // ✅ Загружаем упражнения напрямую из workout
      },
    });

    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error("Ошибка при получении тренировки:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
