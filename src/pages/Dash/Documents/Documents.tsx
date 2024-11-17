import { useQuery } from '@tanstack/react-query';
import { Button, Spoiler, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { getDocuments } from '@/services/endpoints/getters';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';

const Content = ({ searchFilter }: { searchFilter: string }) => {
  const documentsQuery = useQuery({ queryKey: ['documents'], queryFn: getDocuments });

  if (documentsQuery.isLoading || documentsQuery.isFetching) { return <Loading />; }
  if (documentsQuery.isError || !documentsQuery.data) { return <Error />; }

  const filteredData = documentsQuery.data.filter((document) => (
    document.title.toLowerCase().includes(searchFilter.toLowerCase())
  ));

  if (!filteredData.length) { return <Empty />; }

  const rows = filteredData.map((document) => (
    <Table.Tr key={document.id}>
      <Table.Td>{document.title}</Table.Td>
      <Table.Td>
        <Spoiler maw={400} maxHeight={90} hideLabel="Ver menos" showLabel="Ver más">
          {document.description}
        </Spoiler>
      </Table.Td>
      <Table.Td>{document.available_copies}</Table.Td>
      <Table.Td>{document.total_copies}</Table.Td>
      {/* <Table.Td>{document.format.name}</Table.Td> */}
      <Table.Td>
        <Spoiler maw={400} maxHeight={90} hideLabel="Ver menos" showLabel="Ver más">
          {document.authors?.map((author) => author.name).join(', ')}
        </Spoiler>
      </Table.Td>
      <Table.Td>{document.tags?.map((tag) => tag.name).join(', ')}</Table.Td>
      <Table.Td>{document.acquisition_date}</Table.Td>
      <Table.Td>{document.publication_year}</Table.Td>
      <Table.Td>{document.isbn}</Table.Td>
      <Table.Td>{document.total_pages}</Table.Td>
      <Table.Td>{document.edition}</Table.Td>
      <Table.Td>{document.language?.name}</Table.Td>
      <Table.Td>{document.publisher?.name}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table flex={1}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Título</Table.Th>
          <Table.Th>Descripción</Table.Th>
          <Table.Th>Copias disponibles</Table.Th>
          <Table.Th>Copias totales</Table.Th>
          {/* <Table.Th>Formato</Table.Th> */}
          <Table.Th>Autores</Table.Th>
          <Table.Th>Etiquetas</Table.Th>
          <Table.Th>Fecha de adquisición</Table.Th>
          <Table.Th>Año de publicación</Table.Th>
          <Table.Th>ISBN</Table.Th>
          <Table.Th>Páginas</Table.Th>
          <Table.Th>Edición</Table.Th>
          <Table.Th>Idioma</Table.Th>
          <Table.Th>Editorial</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
    </Table>
  );
};

const Documents = () => {
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <div className="stack py-md gap-md">
      <h1>
        Documentos
      </h1>
      <div className="group gap-sm">
        <TextInput
          flex={1}
          placeholder="Buscar documentos"
          leftSection={<IconSearch className="icon xs c-dimmed" />}
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.currentTarget.value)}
        />
        <Button
          variant="primary"
          component={Link}
          href="/new"
        >
          AÑADIR
        </Button>
      </div>
      <Content searchFilter={searchFilter} />
    </div>
  );
};

export default Documents;
