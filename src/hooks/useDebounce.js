import { useEffect, useState } from 'react';
import debounce from '../utils/debounce';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const debounced = debounce(() => setDebouncedValue(value), delay);
    debounced();

    return () => {
      debounced.clear();
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
