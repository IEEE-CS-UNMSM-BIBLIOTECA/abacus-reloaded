import { useState } from 'react';
import { Combobox, Pill, PillsInput, useCombobox } from '@mantine/core';
import { SearchableSelectOptionType } from '@/types';

interface SearchableSelectProps extends React.ComponentPropsWithoutRef<typeof PillsInput> {
  data: SearchableSelectOptionType[];
  value: string[];
  onOptionSubmit: (value: string[]) => void;
  placeholder?: string;
}

const SearchableTagsInput = ({
  data,
  value,
  onOptionSubmit,
  placeholder,
  ...inputProps
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

  const handleValueSelect = (val: string) => {
    setSearch('');
    combobox.closeDropdown();
    const currentValue = value;
    if (currentValue.includes(val)) {
      return;
    }
    const newValue = [...currentValue, val];
    onOptionSubmit(newValue);
  };

  const handleValueRemove = (val: string) => {
    const currentValue = value;
    const newValue = currentValue.filter((item) => item !== val);
    onOptionSubmit(newValue || []);
  };

  const pills = value.map((item: string) => {
    return (
      <Pill key={item} onRemove={() => handleValueRemove(item)} withRemoveButton>
        {data.find((tag) => tag.value === item)?.label}
      </Pill>
    );
  });

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={handleValueSelect}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          {...inputProps}
          onClick={() => combobox.toggleDropdown()}
          radius={0}
        >
          <Pill.Group>
            {pills}
            <Combobox.EventsTarget>
              <PillsInput.Field
                placeholder={value.length ? undefined : placeholder}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                onChange={(e) => {
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                  const val = e.currentTarget.value;
                  setSearch(val);
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

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

export default SearchableTagsInput;
