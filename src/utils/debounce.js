const debounce = (fn, delay) => {
  let timerId = null;

  const clear = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = null;
  };

  const debounced = () => {
    clear();
    timerId = setTimeout(fn, delay);
  };

  debounced.clear = clear;

  return debounced;
};

export default debounce;
