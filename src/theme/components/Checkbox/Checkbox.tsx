import { CheckboxProps, MantineThemeComponent } from '@mantine/core';
import { IconPoint, IconCheck } from '@tabler/icons-react';

const Icon: CheckboxProps['icon'] = (({ indeterminate, ...others }) => (
  indeterminate
  ? <IconPoint
      stroke={2}
      {...others}
    />
  : <IconCheck
      stroke={2}
      {...others}
    />
));

const Component: MantineThemeComponent = {
  defaultProps: {
    color: 'white',
    styles: {
      input: {
        borderRadius: 0,
        borderColor: 'black',
        padding: 0,
      },
      icon: {
        color: 'black',
      },
    },
    icon: Icon,
  },
};

export default Component;
