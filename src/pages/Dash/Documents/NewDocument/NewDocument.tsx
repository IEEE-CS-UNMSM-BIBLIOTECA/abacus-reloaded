import { Button, Checkbox, Grid, NumberInput, Select, TagsInput, Textarea, TextInput } from '@mantine/core';
import { isInRange, useForm } from '@mantine/form';
import { useMutation, useQueries } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Dropzone } from '@mantine/dropzone';
import {
  getAuthors,
  getFormats,
  getLanguages,
  getPublishers,
  getTags,
} from '@/services/endpoints/getters';
import { SubmitDocumentPayload } from '@/types';
import { addDocument } from '@/services/endpoints/setters';

const NewDocument = () => {
  const [, setLocation] = useLocation();

  const optionsQueries = useQueries({
    queries: [
      { queryKey: ['authors'], queryFn: getAuthors },
      { queryKey: ['languages'], queryFn: getLanguages },
      { queryKey: ['formats'], queryFn: getFormats },
      { queryKey: ['publishers'], queryFn: getPublishers },
      { queryKey: ['tags'], queryFn: getTags },
    ],
    combine: (results) => ({
      pending: results.some((result) => result.isPending),
      error: results.some((result) => result.isError),
    }),
  });

  const form = useForm<SubmitDocumentPayload>({
    mode: 'uncontrolled',
    validate: {
      publication_year: isInRange(
        { max: new Date().getFullYear() },
        'El año de publicación no puede ser mayor al actual'
      ),
      total_copies: isInRange(
        { min: 1 },
        'El número de copias debe ser mayor a 0'
      ),
      available_copies: (value, values) => (
        value < values.total_copies
          ? null
          : 'El número de copias disponibles debe ser menor al total'
      ),
    },
  });

  const addDocumentMutation = useMutation({
    mutationFn: (values: SubmitDocumentPayload) => addDocument(values),
  });

  const handleSubmit = () => form.onSubmit(async (values: SubmitDocumentPayload) => {
    await addDocumentMutation.mutateAsync(values);
    setLocation('/documents');
  });

  return (
    <form
      className="stack jc-space-between flex-1"
      onSubmit={handleSubmit()}
    >
      <Grid gutter="xs">
        <Grid.Col span={8}>
          <TextInput
            key={form.key('title')}
            {...form.getInputProps('title')}
            label="Título"
            placeholder="Título del documento"
            required
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            key={form.key('isbn')}
            {...form.getInputProps('isbn')}
            label="ISBN"
            placeholder="0123456789"
            required
          />
        </Grid.Col>
        <Grid.Col>
          <Textarea
            key={form.key('description')}
            {...form.getInputProps('description')}
            label="Descripción"
            placeholder="Descripción del documento"
            required
          />
        </Grid.Col>
        <Grid.Col>
          <TagsInput
            key={form.key('authors_id')}
            {...form.getInputProps('authors_id')}
            label="Autores"
            placeholder="Selecione autores"
            required
          />
        </Grid.Col>
        <Grid.Col>
          <TagsInput
            key={form.key('tags_id')}
            {...form.getInputProps('tags_id')}
            label="Etiquetas"
            placeholder="Selecione etiquetas"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            key={form.key('format_id')}
            {...form.getInputProps('format_id')}
            label="Formato"
            placeholder="Seleccione un formato"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('total_pages')}
            {...form.getInputProps('total_pages')}
            label="Número de páginas"
            placeholder="100"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('base_price')}
            {...form.getInputProps('base_price')}
            label="Precio base"
            placeholder="100"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            type="date"
            key={form.key('acquisition_date')}
            {...form.getInputProps('acquisition_date')}
            label="Fecha de adquisición"
            placeholder="2021-12-31"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('publication_year')}
            {...form.getInputProps('publication_year')}
            label="Año de publicación"
            placeholder="1984"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('edition')}
            {...form.getInputProps('edition')}
            label="Edición"
            placeholder="1"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            key={form.key('language_id')}
            {...form.getInputProps('language_id')}
            label="Idioma"
            placeholder="Selecione un idioma"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            key={form.key('publisher_id')}
            {...form.getInputProps('publisher_id')}
            label="Editorial"
            placeholder="Selecione una editorial"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('total_copies')}
            {...form.getInputProps('total_copies')}
            label="Número de copias"
            placeholder="5"
            required
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            key={form.key('available_copies')}
            {...form.getInputProps('available_copies')}
            label="Copias disponibles"
            placeholder="5"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Checkbox
            className="stack jc-end ai-end"
            style={{ height: '100%' }}
            key={form.key('external_lend_allowed')}
            {...form.getInputProps('external_lend_allowed')}
            label="Préstamo externo permitido"
          />
        </Grid.Col>
      </Grid>
      {/* <Dropzone

      /> */}
      <div className="group jc-space-between">
        <Button
          component={Link}
          href="/documents"
        >
          CANCELAR
        </Button>
        <Button
          variant="primary"
          type="submit"
        >
          CONFIRMAR
        </Button>
      </div>
    </form>
  );
};

export default NewDocument;
