import { MantineThemeComponent, Text } from '@mantine/core';

import classes from './Text.module.css';

const Component: MantineThemeComponent = {
  ...Text.extend({ classNames: classes }),
  defaultProps: {
    fw: 300,
    size: 'md',
  },
};

export default Component;
