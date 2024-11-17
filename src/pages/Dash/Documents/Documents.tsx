import { useQuery } from '@tanstack/react-query';
import { Button, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'wouter';
import { getDocuments } from '@/services/endpoints/getters';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';

const Content = () => {
  const documentsQuery = useQuery({ queryKey: ['documents'], queryFn: getDocuments });

  if (documentsQuery.isLoading) { return <Loading />; }
  if (documentsQuery.isError) { return <Error />; }
  if (!documentsQuery.data.length) { return <Empty />; }

  return (
    <Table flex={1}>

    </Table>
  );
};

const Documents = () => {
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
        />
        <Button
          variant="primary"
          component={Link}
          href="/new"
        >
          AÑADIR
        </Button>
      </div>
      <Content />
    </div>
  );
};

export default Documents;
