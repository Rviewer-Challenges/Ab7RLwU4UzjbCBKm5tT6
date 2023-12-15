import { useEffect, useState } from 'react';

const useTimer = (initialTime, flipTimeout, isPaused) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        let timer;

        if (time > 0 && !isPaused) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, flipTimeout);
        }

        return () => clearInterval(timer);
    }, [time, flipTimeout, isPaused]);

    return {
        time,
        setTime,
    };
};

export default useTimer;