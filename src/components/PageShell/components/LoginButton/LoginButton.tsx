import { Text } from '@mantine/core';
import { useLocation } from 'wouter';

export const LoginButton = () => {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        padding: '2rem 1rem',
        textAlign: 'left',
      }}
    >
      <Text fz={25} style={{ cursor: 'pointer' }} onClick={() => setLocation('/login')}>
        INICIAR SESIÓN
      </Text>
    </div>
  );
};
