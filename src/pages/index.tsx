import { Select } from "@/components/Select";
import type { NextPage } from "next";
import Workout from "public/workout.json";
import { useState } from "react";
const gymDays = [
  { value: "monday", label: "Monday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "friday", label: "Friday" },
];

const getCurrentDay = () => {
  const today = new Date();
  const day = today.getDay();
  const dayList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return dayList[day];
};

const Home: NextPage = () => {
  const [day, setDay] = useState(getCurrentDay());

  const workoutTrain = Workout.find(
    (workout) => workout.day.toLowerCase() === day
  );
  return (
    <div className="flex flex-col items-center gap-4 p-4 py-8 h-screen">
      <Select
        onChange={setDay}
        value={day}
        name="gym-days"
        label="Gym days"
        options={gymDays}
      />

      <ol className="mt-4 flex flex-col gap-4">
        {workoutTrain?.exercises.map((exercise) => (
          <li
            key={exercise.name}
            className="dark:text-white border-2 border-yellow-100 p-3 rounded-md"
          >
            <h2>{exercise.name}</h2>

            <p>
              {exercise.series} x {exercise.repetitions}
            </p>

            <div className="px-3 py-1 w-fit mt-2 rounded-lg bg-slate-500">
              {exercise.muscle}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
