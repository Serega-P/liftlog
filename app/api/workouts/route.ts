import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
		const workouts = await prisma.workout.findMany({
			include: {
				days: {
					include: {
						exercises: {
							include: {
								setGroup: {
									include: {
										set: true,
										triset: {
											include: {
												subSets: true,
											}
										}
									}
								}
							}
						}
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

    if (!title || !color || exercises.length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newWorkout = await prisma.workout.create({
			data: {
				title,
				color,
				userId: 1,
				exercises: {
					create: exercises.map((exercise: { name: string }) => ({
						name: exercise.name,
						workoutDay: undefined,
					})),
				},
			},
			include: { exercises: true },
		});

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании тренировки:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


