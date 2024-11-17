import { MantineThemeComponents } from '@mantine/core';
import Button from './Button';
import Card from './Card';
import Text from './Text';
// import Select from './Select';
import TextInput from './TextInput';
import Rating from './Rating';
import Checkbox from './Checkbox';
import Modal from './Modal';
import Textarea from './Textarea';
import Title from './Title';

const components: MantineThemeComponents = {
  Button,
  Card,
  Text,
  Select: TextInput,
  TextInput,
  Input: TextInput,
  TagsInput: TextInput,
  NumberInput: {
    ...TextInput,
    defaultProps: {
      ...TextInput.defaultProps,
      hideControls: true,
    },
  },
  ActionIcon: {
    defaultProps: {
      radius: 0,
      color: 'black',
    },
  },
  Textarea,
  Rating,
  Checkbox,
  Modal,
  Title,
};

export default components;
