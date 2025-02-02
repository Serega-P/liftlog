import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Получить тренировку по ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const workout = await prisma.workout.findUnique({
      where: { id: Number(params.id) },
      include: { days: true, results: true },
    });

    if (!workout) {
      return NextResponse.json({ error: "Тренировка не найдена" }, { status: 404 });
    }

    return NextResponse.json(workout, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении тренировки" }, { status: 500 });
  }
}

// Обновить тренировку
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, color } = await req.json();

    const updatedWorkout = await prisma.workout.update({
      where: { id: Number(params.id) },
      data: { title, color },
    });

    return NextResponse.json(updatedWorkout, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при обновлении тренировки" }, { status: 500 });
  }
}

// Удалить тренировку
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.workout.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Тренировка удалена" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при удалении тренировки" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import { mockWorkouts } from "@/app/mock/workouts";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const workout = mockWorkouts.find((w) => w.id === parseInt(params.id));
//   if (!workout) {
//     return NextResponse.json({ error: "Workout not found" }, { status: 404 });
//   }

//   return NextResponse.json(workout);
// }
