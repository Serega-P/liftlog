import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Получить все упражнения
export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({
      include: { sets: true, trisets: true }
    });

    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при получении упражнений" }, { status: 500 });
  }
}

// Создать новое упражнение
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    const newExercise = await prisma.exercise.create({
      data: { name }
    });

    return NextResponse.json(newExercise, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при создании упражнения" }, { status: 500 });
  }
}
