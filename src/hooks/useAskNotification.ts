import { useEffect, useState } from "react";

const askNotification = () => {
  return new Promise((resolve, reject) =>
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        return resolve(result);
      }
      return reject(result);
    })
  );
};

export const useAskNotification = () => {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    askNotification()
      .then(() => setIsGranted(true))
      .catch(() => setIsGranted(false));
  }, []);

  return {
    isGranted,
  };
};
