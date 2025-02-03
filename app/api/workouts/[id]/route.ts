import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const workout = await prisma.workout.findUnique({
      where: { id: Number(id) || 0 }, // Преобразуем в число
      include: {
				days: {
					orderBy: { date: "desc" }, 
					take: 1, 
					include: {
						exercises: {
							include: {
								setGroup: {
									include: {
										set: true,   // Обычные сеты
										triset: {
											include: {
												subSets: true,  // Подсеты внутри трисетов
											},
										},
									},
								},
							},
						},
					},
				},
			},
    });

    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error("Ошибка при получении тренировки:", error);
    return NextResponse.json({ error: "Ошибка сервера", details: error.message }, { status: 500 });
  }
}
