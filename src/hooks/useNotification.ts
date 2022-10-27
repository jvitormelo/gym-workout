interface SendNotificationParams extends NotificationOptions {
  title: string;
}

export const useNotification = () => {
  const sendNotification = ({ title, ...options }: SendNotificationParams) => {
    new Notification(title, options);
  };

  return {
    sendNotification,
  };
};
