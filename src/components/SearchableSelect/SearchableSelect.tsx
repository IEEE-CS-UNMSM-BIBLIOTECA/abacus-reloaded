import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { SearchableSelectOption } from '@/types';

interface SearchableSelectProps {
  data: SearchableSelectOption[];
  value?: string | null;
  onChange?: (val: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const SearchableSelect = ({
  data,
  ...props
}: SearchableSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');

  const shouldFilterOptions = data.every((item) => item.label !== search);
  const filteredOptions = shouldFilterOptions
    ? data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
    : data;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setSearch(data.find((item) => item.value === val)?.label || '');
        combobox.closeDropdown();
        props.onChange && props.onChange(val);
      }}
    >
      <Combobox.Target>
        <InputBase
          flex={1}
          label={props.label}
          required={props.required}
          error={props.error}
          radius={0}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            const { value } = event.currentTarget;
            setSearch(value);
            const matchItem = data.find((item) => item.label === value);
            if (matchItem) {
              props.onChange && props.onChange(matchItem.value);
            } else {
              props.onChange && props.onChange('');
            }
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={(e) => {
            combobox.openDropdown();
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            combobox.closeDropdown();
            props.onBlur && props.onBlur(e);
          }}
          placeholder={props.placeholder || 'Seleccione una opción'}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
        {
          options.length > 0
            ? options
            : <Combobox.Empty>
                No se encontraron resultados
              </Combobox.Empty>
        }
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchableSelect;
