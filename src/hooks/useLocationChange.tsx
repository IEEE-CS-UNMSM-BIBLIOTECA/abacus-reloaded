import { useEffect } from 'react';
import { useLocation } from 'wouter';

const useLocationChange = () => {
  const [location] = useLocation();

  useEffect(() => {}, [location]);
};

export default useLocationChange;
