import { notifyUser } from "@/utils/notifyUser";
// import RoutineData from "public/routine.json";
import { useEffect, useState } from "react";

type RoutineItem = {
  time: string;
  action: string;
};

const getCurrentTime = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  return `${hours}:${minutes}`;
};

const generateMockedRoutine = () => {
  const actions = ["Wake up", "Brush teeth", "Walk with the dogo", "Sleep"];

  const [hours, minutes] = getCurrentTime().split(":");

  return actions.map((action, index) => {
    const time = `${hours}:${+minutes + index + 1}`;
    return { time, action };
  });
};

const hasTimeExpired = (time: string) => {
  const [hours, minutes] = time.split(":");

  const [currentHour, currentMinute] = getCurrentTime().split(":");

  if (Number(hours) < Number(currentHour)) {
    return true;
  }

  if (
    Number(hours) === Number(currentHour) &&
    Number(minutes) < Number(currentMinute)
  ) {
    return true;
  }

  return false;
};

// convert 21:00 to Date
const convertTimeToDate = (time: string) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  return date;
};

const getMinutesToNextTask = (taskNotDone: RoutineItem) => {
  const current = convertTimeToDate(getCurrentTime());

  console.log(current);

  const nextTask = convertTimeToDate(taskNotDone.time);
  nextTask.setSeconds(0);
  nextTask.setMilliseconds(0);

  return (nextTask.getTime() - current.getTime()) / 1000 / 60;
};

const Routine = () => {
  const [routine, setRoutine] = useState(
    generateMockedRoutine().map((routine) => {
      return { ...routine, isDone: hasTimeExpired(routine.time) };
    })
  );

  const trackRoutine = () => {
    const nextTask = routine.find((item) => !item.isDone);

    if (nextTask) {
      document.title = `${nextTask.time} Routine - ${nextTask.action}`;
      const minutesToNextTask = getMinutesToNextTask(nextTask);

      if (minutesToNextTask <= 0) {
        return;
      }

      return setTimeout(() => {
        setRoutine((prev) =>
          prev.map((item) => {
            if (item.time === nextTask.time) {
              console.log(item, "map");
              return { ...item, isDone: true };
            }
            return item;
          })
        );
        console.log(`Task done ${nextTask.action}`);

        notifyUser(nextTask.action);
        trackRoutine();
      }, minutesToNextTask * 60 * 1000);
    }
  };

  useEffect(() => {
    const timer = trackRoutine();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center dark:text-white">
      <h1 className="mb-4 text-xl">Routine</h1>

      <ul className="">
        {routine.map((item) => (
          <li
            key={item.time}
            className={`${item.isDone && "text-red-400 line-through"}`}
          >
            {item.time} - {item.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routine;
