import { MantineThemeComponent, TextInput } from '@mantine/core';

import classes from './TextInput.module.css';

const Component: MantineThemeComponent = {
  ...TextInput.extend({ classNames: classes }),
  defaultProps: {
    radius: 0,
  },
};

export default Component;
