import { notifyUser } from "@/utils/notifyUser";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const startTime = () => {
    setTime(seconds);

    const interVal = setInterval(() => {
      setTime((prevTime) => {
        const newValue = prevTime - 1;

        if (newValue <= 0) {
          navigator.vibrate([3000, 2000]);

          notifyUser("Time is up! Time to move on!");
          clearInterval(interVal);
          return newValue;
        }
        return newValue;
      });
    }, 1000);
  };

  return (
    <div className="text-white mt-4">
      <div className="flex items-end gap-2">
        <div className="flex flex-col w-20">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Seconds
          </label>
          <input
            data-testid="timer-input"
            disabled={time > 0}
            type="number"
            id="small-input"
            value={seconds.toString()}
            onChange={(e) => setSeconds(+e.target.value)}
            className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          data-testid="start-button"
          disabled={time > 0}
          onClick={startTime}
          className="bg-blue-500 min-w-3 hover:bg-blue-700 text-white font-bold py-2 h-fit px-4 rounded"
        >
          <CSSTransition timeout={1000} classNames="myclass" in={time > 0}>
            <span>{time > 0 ? time : "Start"}</span>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};
