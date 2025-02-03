import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function down() {
  console.log("Удаление всех данных...");

  await prisma.subSet.deleteMany({});
  await prisma.triset.deleteMany({});
  await prisma.set.deleteMany({});
  await prisma.sets.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.workoutDay.deleteMany({});
  await prisma.workout.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Данные удалены!");
}

async function up() {
  console.log("Создание пользователей...");
  const user1 = await prisma.user.create({
    data: {
      fullName: 'User Test',
      email: 'user@test.ru',
      password: hashSync('111111', 10),
      verified: new Date(),
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      fullName: 'Admin Admin',
      email: 'admin@test.ru',
      password: hashSync('111111', 10),
      verified: new Date(),
      role: 'ADMIN',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      fullName: 'Serhii P',
      email: 'serhii@test.ru',
      password: hashSync('11111121', 10),
      verified: new Date(),
      role: 'USER',
    },
  });

  console.log("Создание тренировок...");
  const workout1 = await prisma.workout.create({
    data: {
      title: 'Силовая тренировка',
      color: '#FF5733',
      userId: user1.id,
    },
  });

  const workout2 = await prisma.workout.create({
    data: {
      title: 'Кардио тренировка',
      color: '#33FF57',
      userId: user1.id,
    },
  });

  console.log("Создание дней тренировок...");
  const day1 = await prisma.workoutDay.create({
    data: {
      date: new Date('2025-01-29'),
      workoutId: workout1.id,
    },
  });

  const day2 = await prisma.workoutDay.create({
    data: {
      date: new Date('2025-02-01'),
      workoutId: workout2.id,
    },
  });

  console.log("Создание упражнений...");
  const exercise1 = await prisma.exercise.create({
    data: {
			workoutId: workout1.id,
			dayExercises: day1.id,
      name: 'Жим штанги лежа',
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
			workoutId: workout1.id,
			dayExercises: day1.id,
      name: 'Приседания со штангой',
    },
  });
  const exercise3 = await prisma.exercise.create({
    data: {
			workoutId: workout2.id,
			dayExercises: day2.id,
      name: 'Cо штангой',
    },
  });
  const exercise4 = await prisma.exercise.create({
    data: {
			workoutId: workout2.id,
			dayExercises: day2.id,
      name: 'Гантель на бицепс',
    },
  });

  // Жим штанги лежа
  const setGroup1 = await prisma.sets.create({
		data: {
			exerciseId: exercise1.id,
		}
  });

	// Приседания со штангой
  const setGroup2 = await prisma.sets.create({
		data: {
			exerciseId: exercise2.id,
		}
  });

	// Cо штангой
  const setGroup3 = await prisma.sets.create({
		data: {
			exerciseId: exercise3.id,
		}
  });
	// Гантель на бицепс
  const setGroup4 = await prisma.sets.create({
		data: {
			exerciseId: exercise4.id,
		}
  });


  console.log("Создание сетов...");
  await prisma.set.createMany({
    data: [
      { setGroupId: setGroup1.id, type: "set", weight: 80, reps: 8 },
      { setGroupId: setGroup1.id, type: "set", weight: 85, reps: 7 },
      { setGroupId: setGroup1.id, type: "set", weight: 80, reps: 6 },
			
      { setGroupId: setGroup2.id, type: "set", weight: 90, reps: 10 },
      { setGroupId: setGroup2.id, type: "set", weight: 95, reps: 12 },
      { setGroupId: setGroup2.id, type: "set", weight: 90, reps: 10 },
			
      { setGroupId: setGroup4.id, type: "set", weight: 30, reps: 10 },
      { setGroupId: setGroup4.id, type: "set", weight: 35, reps: 12 },
      { setGroupId: setGroup4.id, type: "set", weight: 30, reps: 10 },
      { setGroupId: setGroup4.id, type: "set", weight: 35, reps: 12 },
      { setGroupId: setGroup4.id, type: "set", weight: 30, reps: 10 },
    ],
  });

  console.log("Создание трисетов...");
  const triset1 = await prisma.triset.create({
    data: {
      setGroupId: setGroup1.id,
      type: "triset",
    },
  });
  const triset2 = await prisma.triset.create({
    data: {
      setGroupId: setGroup2.id,
      type: "triset",
    },
  });
	// Cо штангой
  const triset3 = await prisma.triset.create({
    data: {
      setGroupId: setGroup3.id,
      type: "triset",
    },
  });
  const triset4 = await prisma.triset.create({
    data: {
      setGroupId: setGroup3.id,
      type: "triset",
    },
  });
  const triset5 = await prisma.triset.create({
    data: {
      setGroupId: setGroup3.id,
      type: "triset",
    },
  });

  console.log("Создание под-сетов (SubSet) для трисета...");
  await prisma.subSet.createMany({
    data: [
      { trisetId: triset1.id, weight: 40, reps: 12, order: 1 },
      { trisetId: triset1.id, weight: 45, reps: 10, order: 2 },
      { trisetId: triset1.id, weight: 50, reps: 8, order: 3 },

      { trisetId: triset2.id, weight: 140, reps: 12, order: 1 },
      { trisetId: triset2.id, weight: 145, reps: 10, order: 2 },
      { trisetId: triset2.id, weight: 150, reps: 8, order: 3 },

      { trisetId: triset3.id, weight: 140, reps: 12, order: 1 },
      { trisetId: triset3.id, weight: 145, reps: 10, order: 2 },
      { trisetId: triset3.id, weight: 150, reps: 8, order: 3 },

      { trisetId: triset4.id, weight: 140, reps: 12, order: 1 },
      { trisetId: triset4.id, weight: 145, reps: 10, order: 2 },
      { trisetId: triset4.id, weight: 150, reps: 8, order: 3 },

      { trisetId: triset5.id, weight: 140, reps: 12, order: 1 },
      { trisetId: triset5.id, weight: 145, reps: 10, order: 2 },
      { trisetId: triset5.id, weight: 150, reps: 8, order: 3 },

    ],
  });

  console.log("Все данные успешно добавлены!");
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error("Ошибка при выполнении seed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
