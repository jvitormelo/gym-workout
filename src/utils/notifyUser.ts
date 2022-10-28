interface SendNotificationParams extends NotificationOptions {
  title: string;
}

const vibrate = (duration: number | number[]) => {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
};

const sendNotification = ({ title, ...options }: SendNotificationParams) => {
  try {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    }
  } catch (e) {
    console.error(e);
  }
};

export const notifyUser = (action: string) => {
  sendNotification({
    title: action,
  });

  if (window.focus) window.focus();

  vibrate([3000, 2000]);

  if (window.alert) window.alert(action);
};
