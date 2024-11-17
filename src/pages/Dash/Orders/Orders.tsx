import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActionIcon, Button, Table, TextInput } from '@mantine/core';
import { IconChecks, IconSearch } from '@tabler/icons-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { getOrders } from '@/services/endpoints/getters';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import getOrderStatus from '@/utils/getOrderStatus';
import { finishOrder } from '@/services/endpoints/setters';

const Content = ({ searchFilter }: { searchFilter: string }) => {
  const ordersQuery = useQuery({ queryKey: ['documents'], queryFn: getOrders });

  if (ordersQuery.isLoading || ordersQuery.isFetching) { return <Loading />; }
  if (ordersQuery.isError || !ordersQuery.data) { return <Error />; }
  if (!ordersQuery.data.length) { return <Empty />; }

  const queryClient = useQueryClient();

  const finishOrderMutation = useMutation({
    mutationFn: (orderId: number) => finishOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const filteredData = ordersQuery.data.filter((order) => (
    order.user.username.toLowerCase().includes(searchFilter.toLowerCase())
  ));

  if (!filteredData.length) { return <Empty />; }

  const handleFinishOrder = () => (orderId: number) => {
    finishOrderMutation.mutate(orderId);
  };

  const rows = ordersQuery.data.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.user?.username}</Table.Td>
      <Table.Td>{order.document?.title}</Table.Td>
      <Table.Td>{getOrderStatus(order)}</Table.Td>
      <Table.Td>{order.order_date}</Table.Td>
      <Table.Td>{order.max_return_date}</Table.Td>
      <Table.Td>{order.actual_return_date || 'No devuelto'}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={handleFinishOrder}>
          <IconChecks className="icon sm" size={20} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table flex={1}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Usuario</Table.Th>
          <Table.Th>Documento</Table.Th>
          <Table.Th>Estado</Table.Th>
          <Table.Th>Fecha de orden</Table.Th>
          <Table.Th>Fecha máxima de devolución</Table.Th>
          <Table.Th>Fecha de devolución</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows}
      </Table.Tbody>
    </Table>
  );
};

const Orders = () => {
  const [searchFilter, setSearchFilter] = useState('');

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

export default Orders;
