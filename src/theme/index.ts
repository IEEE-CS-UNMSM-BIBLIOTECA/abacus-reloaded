'use client';

import { createTheme } from '@mantine/core';

import colors from './colors';
import headings from './headings';
import components from './components';

export const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Ubuntu Sans, sans-serif',
  colors,
  headings,
  components,
});
