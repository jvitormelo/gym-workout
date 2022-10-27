import { useAskNotification } from "@/hooks/useAskNotification";
import { useState } from "react";

const seconds = 2;

export const Timer = () => {
  const { sendNotification } = useAskNotification();
  const [time, setTime] = useState(0);

  const startTime = () => {
    setTime(seconds);

    const interVal = setInterval(() => {
      setTime((prevTime) => {
        const newValue = prevTime - 1;

        if (newValue === 0) {
          navigator.vibrate([3000, 2000]);

          sendNotification("Ola");
          clearInterval(interVal);
        }
        return newValue;
      });
    }, 1000);
  };

  return (
    <div className="text-white">
      {time ? (
        <h1 className="text-red-500 rounded-3xl p-20 bg-white text-9xl">
          {time}
        </h1>
      ) : (
        <button
          onClick={startTime}
          className="p-4 dark:bg-slate-300 rounded-xl"
        >
          START
        </button>
      )}
    </div>
  );
};
