import { Button, Grid, Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { getCountries, getGenders } from '@/services/endpoints/getters';
import { CountryType, GenderType, SubmitAuthorPayload } from '@/types';
import SearchableSelect from '../SearchableSelect';
import { addAuthor } from '@/services/endpoints/setters';

const NewAuthor = ({ opened, onClose }: {
  opened: boolean;
  onClose: () => void;
}) => {
  const optionsQueries = useQueries({
    queries: [
      { queryKey: ['countries'], queryFn: getCountries },
      { queryKey: ['genders'], queryFn: getGenders },
    ],
    combine: (results) => ({
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
      error: results.some((result) => result.isError),
    }),
  });

  const countriesData = optionsQueries.data[0]
    ? optionsQueries.data[0].map((country: CountryType) => ({
      value: country.id,
      label: country.name,
    }))
    : [];

  const gendersData = optionsQueries.data[1]
    ? optionsQueries.data[1].map((gender: GenderType) => ({
      value: gender.id,
      label: gender.name,
    }))
    : [];

  const form = useForm<SubmitAuthorPayload>();

  const queryClient = useQueryClient();

  const addAuthorMutation = useMutation({
    mutationFn: (values: SubmitAuthorPayload) => addAuthor(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });

  const handleSubmit = () => form.onSubmit(async (values: SubmitAuthorPayload) => {
    await addAuthorMutation.mutateAsync(values);
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose}>
      <form className="stack gap-xl" onSubmit={handleSubmit()}>
        <Grid gutter="xs">
          <Grid.Col>
            <TextInput
              key={form.key('name')}
              {...form.getInputProps('name')}
              label="Nombre"
              placeholder="Juan Pérez"
              required
            />
          </Grid.Col>
          <Grid.Col>
            <Textarea
              key={form.key('bio')}
              {...form.getInputProps('bio')}
              label="Biografía"
              placeholder="Escriba una breve biografía del autor"
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              key={form.key('birth_date')}
              {...form.getInputProps('birth_date')}
              label="Fecha de nacimiento"
              type="date"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              key={form.key('death_date')}
              {...form.getInputProps('death_date')}
              label="Fecha de fallecimiento"
              type="date"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <SearchableSelect
              key={form.key('gender_id')}
              {...form.getInputProps('gender_id')}
              label="Género"
              placeholder="Seleccione una opción"
              data={gendersData}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <SearchableSelect
              key={form.key('country_id')}
              {...form.getInputProps('country_id')}
              label="País"
              placeholder="Seleccione una opción"
              data={countriesData}
              required
            />
          </Grid.Col>
        </Grid>
        <div className="group jc-space-between">
          <Button onClick={onClose}>
            CERRAR
          </Button>
          <Button variant="primary" type="submit">
            GUARDAR
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewAuthor;
