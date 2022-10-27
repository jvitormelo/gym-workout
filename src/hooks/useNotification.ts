import { useEffect } from "react";

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

export const useNotification = () => {
  useEffect(() => {
    askNotification()
      .then((result) => {
        console.log("permission granted", result);
      })
      .catch((result) => {
        console.log("permission denied", result);
      });
  }, []);

  const sendNotification = (title: string) => {
    new Notification(title, {
      body: "New eminence in shadows Ep",
      image:
        "https://static.wikia.nocookie.net/to-be-a-power-in-the-shadows/images/4/4b/MV5BMTQ2MmFlYTMtNTEzOS00ODBmLWFjNjQtYTYzNDk2YTU5MjM4XkEyXkFqcGdeQXVyMDc5ODIzMw%40%40._V1_.jpg/revision/latest?cb=20221023150344",
    });

    // new ServiceWorkerRegistration().showNotification(title);
  };

  return {
    sendNotification,
  };
};
