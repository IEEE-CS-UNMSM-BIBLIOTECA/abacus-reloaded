import { useQuery } from '@tanstack/react-query';
import { Button, Table, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'wouter';
import { getOrders } from '@/services/endpoints/getters';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';

const Content = () => {
  const ordersQuery = useQuery({ queryKey: ['orders'], queryFn: getOrders });

  if (ordersQuery.isLoading) { return <Loading />; }
  if (ordersQuery.isError) { return <Error />; }
  if (!ordersQuery.data.length) { return <Empty />; }

  return (
    <Table flex={1}>

    </Table>
  );
};

const Orders = () => {
  return (
    <div className="stack py-md gap-md">
      <h1>
        Órdenes
      </h1>
      <div className="group gap-sm">
        <TextInput
          flex={1}
          placeholder="Buscar órdenes"
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

export default Orders;
