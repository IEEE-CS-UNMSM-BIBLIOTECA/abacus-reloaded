import { MantineThemeComponent, Button } from '@mantine/core';

import classes from './Button.module.css';

const Component: MantineThemeComponent = {
  ...Button.extend({ classNames: classes }),
  defaultProps: {
    radius: 0,
    variant: 'secondary',
  },
};

export default Component;
