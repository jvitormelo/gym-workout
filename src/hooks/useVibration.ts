export const useVibration = () => {
  const vibrate = (duration: number | number[]) => {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  return {
    vibrate,
  };
};
