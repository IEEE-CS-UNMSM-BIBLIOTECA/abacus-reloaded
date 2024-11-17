import { rem } from '@mantine/core';
import './headings.css';

const base = 85;
const scale = 1.5;

export default {
  fontWeight: '200',
  sizes: {
    h1: {
      fontSize: rem(base / scale ** 0),
      lineHeight: '0.95',
    },
    h2: {
      fontSize: rem(base / scale ** 1),
      lineHeight: '0.95',
    },
    h3: {
      fontSize: rem(base / scale ** 2),
      lineHeight: '0.95',
    },
    h4: {
      fontSize: rem(base / scale ** 3),
      lineHeight: '0.95',
    },
    h5: {
      fontSize: rem(base / scale ** 4),
      lineHeight: '0.95',
    },
    h6: {
      fontSize: rem(base / scale ** 5),
      lineHeight: '0.95',
    },
  },
};
