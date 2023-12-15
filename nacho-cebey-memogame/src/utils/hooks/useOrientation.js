import { useEffect } from 'react';

function useOrientation(callback) {
  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation =
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      callback(newOrientation);
    };

    handleOrientationChange();

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [callback]);
}

export default useOrientation