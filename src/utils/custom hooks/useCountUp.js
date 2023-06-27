import { useState, useEffect } from 'react';

const useCountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = (end - start) / (duration * 1000); // Calcula el incremento por milisegundo

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setCount(start);
    }, 1); // Actualiza el valor cada milisegundo

    return () => {
      clearInterval(timer);
    };
  }, [end, duration]);

  return count;
};

export default useCountUp;