import { MantineThemeComponent } from '@mantine/core';

const Modal: MantineThemeComponent = {
  defaultProps: {
    radius: 0,
    transitionProps: { duration: 0 },
    centered: true,
    padding: 'lg',
    withCloseButton: false,
    shadow: 'none',
  },
};

export default Modal;
