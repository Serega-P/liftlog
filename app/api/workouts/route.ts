import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
		const workouts = await prisma.workout.findMany({
			select: {
				id: true,
				color: true,
				title: true,
				days: {
					select: {
						id: true,
						date: true
					}
				}
			}
		});
		

    return NextResponse.json(workouts);
  } catch (error) {
    console.error('Ошибка при получении тренировок:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const { title, color, exercises } = await req.json();

    if (!title || !color || !Array.isArray(exercises)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // 1️⃣ Создаём воркаут
    const newWorkout = await prisma.workout.create({
      data: {
        title,
        color,
        userId: 4,
      },
    });

    const newWorkoutDay = await prisma.workoutDay.create({
			data: {
				date: null, // ✅ Текущая дата
				workoutId: newWorkout.id, // ✅ Связываем день с воркаутом
				exercises: {
					create: exercises.map((exercise: { name: string }) => ({
						name: exercise.name,
						workoutId: newWorkout.id, // ✅ Указываем ID воркаута
						setGroup: {
							create: {},
						},
					})),
				},
			},
			include: {
				exercises: true,
			},
		});

    return NextResponse.json(
      { ...newWorkout, days: [newWorkoutDay] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при создании тренировки:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}




