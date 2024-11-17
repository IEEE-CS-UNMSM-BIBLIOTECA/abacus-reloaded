import { ActionIcon, Button, Checkbox, Grid, NumberInput, Textarea, TextInput } from '@mantine/core';
import { isInRange, useForm } from '@mantine/form';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Dropzone } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import {
  getAuthors,
  getFormats,
  getLanguages,
  getPublishers,
  getTags,
} from '@/services/endpoints/getters';
import { AuthorBaseType, DocumentFormatType, LanguageType, PublisherType, SubmitDocumentFormData, SubmitDocumentPayload, TagType } from '@/types';
import { addDocument } from '@/services/endpoints/setters';
import SearchableSelect from '@/components/SearchableSelect';
import SearchableTagsInput from '@/components/SearchableTagsInput';
import NewAuthor from '@/components/NewAuthor';
import NewTag from '@/components/NewTag';
import NewPublisher from '../NewPublisher';

const NewDocument = () => {
  const [, setLocation] = useLocation();
  const [authorsModalOpened, authorsModalHandlers] = useDisclosure(false);
  const [tagsModalOpened, tagsModalHandlers] = useDisclosure(false);
  const [publishersModalOpened, publishersModalHandlers] = useDisclosure(false);

  const optionsQueries = useQueries({
    queries: [
      { queryKey: ['authors'], queryFn: getAuthors },
      { queryKey: ['formats'], queryFn: getFormats },
      { queryKey: ['languages'], queryFn: getLanguages },
      { queryKey: ['publishers'], queryFn: getPublishers },
      { queryKey: ['tags'], queryFn: getTags },
    ],
    combine: (results) => ({
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
      error: results.some((result) => result.isError),
    }),
  });

  const authorsData = optionsQueries.data[0]
    ? optionsQueries.data[0].map((author: AuthorBaseType) => ({
      value: author.id.toString(),
      label: author.name,
    }))
    : [];

  const formatsData = optionsQueries.data[1]
    ? optionsQueries.data[1].map((format: DocumentFormatType) => ({
      value: format.id.toString(),
      label: format.name,
    }))
    : [];

  const languagesData = optionsQueries.data[2]
    ? optionsQueries.data[2].map((language: LanguageType) => ({
      value: language.id.toString(),
      label: language.name,
    }))
    : [];

  const publishersData = optionsQueries.data[3]
    ? optionsQueries.data[3].map((publisher: PublisherType) => ({
      value: publisher.id.toString(),
      label: publisher.name,
    }))
    : [];

  const tagsData = optionsQueries.data[4]
    ? optionsQueries.data[4].map((tag: TagType) => ({
      value: tag.id.toString(),
      label: tag.name,
    }))
    : [];

  const form = useForm<SubmitDocumentFormData>({
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
        value <= values.total_copies
          ? null
          : 'El número de copias disponibles debe ser menor al total'
      ),
    },
  });

  const queryClient = useQueryClient();

  const addDocumentMutation = useMutation({
    mutationFn: (values: SubmitDocumentPayload) => addDocument(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const handleSubmit = () => form.onSubmit(async (values: SubmitDocumentFormData) => {
    const data: SubmitDocumentPayload = {
      ...values,
      ISBN: values.isbn,
      authors_id: values.authors_id.map((id) => parseInt(id, 10)),
      language_id: parseInt(values.language_id, 10),
      format_id: parseInt(values.format_id, 10),
      publisher_id: parseInt(values.publisher_id, 10),
      tags_id: values.tags_id.map((id) => parseInt(id, 10)),
    };
    await addDocumentMutation.mutateAsync(data);
    setLocation('/documents');
  });

  const handleFileDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      form.setFieldValue('cover_url', base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <form
        className="stack gap-xl jc-space-between flex-1"
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
            <TextInput
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
          <Grid.Col className="group gap-sm ai-end">
            <SearchableTagsInput
              data={authorsData}
              className="flex-1"
              label="Autores"
              onOptionSubmit={(value) => form.setFieldValue('authors_id', value)}
              value={form.getValues().authors_id || []}
              placeholder="Selecione autores"
              required
            />
            <ActionIcon onClick={authorsModalHandlers.open}>
              <IconPlus className="icon sm c-white" size={20} />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col className="group gap-sm ai-end">
            <SearchableTagsInput
              data={tagsData}
              className="flex-1"
              label="Etiquetas"
              onOptionSubmit={(value) => form.setFieldValue('tags_id', value)}
              value={form.getValues().tags_id || []}
              placeholder="Selecione etiquetas"
              required
            />
            <ActionIcon onClick={tagsModalHandlers.open}>
              <IconPlus className="icon sm c-white" size={20} />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span={6}>
            <SearchableSelect
              key={form.key('format_id')}
              {...form.getInputProps('format_id')}
              label="Formato"
              placeholder="Seleccione un formato"
              data={formatsData}
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
            <SearchableSelect
              key={form.key('language_id')}
              {...form.getInputProps('language_id')}
              label="Idioma"
              placeholder="Selecione un idioma"
              data={languagesData}
              required
            />
          </Grid.Col>
          <Grid.Col span={6} className="group gap-sm ai-end">
            <SearchableSelect
              key={form.key('publisher_id')}
              {...form.getInputProps('publisher_id')}
              label="Editorial"
              placeholder="Selecione una editorial"
              data={publishersData}
              required
            />
            <ActionIcon onClick={publishersModalHandlers.open}>
              <IconPlus className="icon sm c-white" size={20} />
            </ActionIcon>
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
              label="Permitir préstamo externo"
            />
          </Grid.Col>
        </Grid>
        <Dropzone
          onDrop={handleFileDrop}
          bg="gray.2"
          className="stack gap-sm ai-center jc-center"
          flex={1}
        >
          <p className="fz-sm c-dimmed">
            Arrastre o haga clic para subir una imagen de portada
          </p>
        </Dropzone>
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
      {
        authorsModalOpened &&
        <NewAuthor
          opened={authorsModalOpened}
          onClose={authorsModalHandlers.close}
        />
      }
      {
        tagsModalOpened &&
        <NewTag
          opened={tagsModalOpened}
          onClose={tagsModalHandlers.close}
        />
      }
      {
        publishersModalOpened &&
        <NewPublisher
          opened={publishersModalOpened}
          onClose={publishersModalHandlers.close}
        />
      }
    </>
  );
};

export default NewDocument;
