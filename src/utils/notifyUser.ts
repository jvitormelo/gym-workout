interface SendNotificationParams extends NotificationOptions {
  title: string;
}

const vibrate = (duration: number | number[]) => {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
};

const sendNotification = ({ title, ...options }: SendNotificationParams) => {
  new Notification(title, options);
};

export const notifyUser = (action: string) => {
  window.focus();
  sendNotification({
    title: action,
  });
  vibrate([3000, 2000]);
  window.alert(action);
};
