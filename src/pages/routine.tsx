import RoutineData from "public/routine.json";
import { useCallback, useEffect, useState } from "react";

interface SendNotificationParams extends NotificationOptions {
  title: string;
}

const sendNotification = ({ title, ...options }: SendNotificationParams) => {
  new Notification(title, options);
};

const vibrate = (duration: number | number[]) => {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
};

const Routine = () => {
  //   const { sendNotification } = useNotification();
  const [routine, setRoutine] = useState(
    RoutineData.map((routine) => ({ ...routine, isDone: false }))
  );
  //   const { vibrate } = useVibration();

  const checkRoutine = useCallback(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const currentTime = `${hours}:${minutes}`;

    setRoutine((prevRoutine) =>
      prevRoutine.map((item) => {
        if (item.time === currentTime && !item.isDone) {
          window.focus();
          window.alert(item.action);
          sendNotification({
            title: item.action,
          });
          vibrate([3000, 2000]);
          return {
            ...item,
            isDone: true,
          };
        }
        return item;
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkRoutine();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [checkRoutine]);
  return (
    <div>
      <h1>Routine</h1>

      <ul className="dark:text-white">
        {routine.map((item) => (
          <li key={item.time}>
            {item.time} - {item.action} - {item.isDone ? "Done" : "Not done"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routine;
