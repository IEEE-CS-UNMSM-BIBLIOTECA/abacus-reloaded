import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActionIcon, Checkbox, Table, TextInput } from '@mantine/core';
import { IconChecks, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { getOrders } from '@/services/endpoints/getters';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Empty from '@/components/Empty';
import getOrderStatus from '@/utils/getOrderStatus';
import { finishOrder } from '@/services/endpoints/setters';

const Content = ({ searchFilter, active }: { searchFilter: string, active: boolean }) => {
  const ordersQuery = useQuery({ queryKey: ['orders'], queryFn: getOrders });

  const finishOrderMutation = useMutation({
    mutationFn: (orderId: number) => finishOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const queryClient = useQueryClient();

  if (ordersQuery.isLoading || ordersQuery.isFetching) { return <Loading />; }
  if (ordersQuery.isError || !ordersQuery.data) { return <Error />; }
  if (!ordersQuery.data.length) { return <Empty />; }

  const filteredData = ordersQuery.data
    .filter((order) => (
      order.user?.name.toLowerCase().includes(searchFilter.toLowerCase())
    ));

  if (!filteredData.length) { return <Empty />; }

  const handleFinishOrder = (orderId: number) => {
    finishOrderMutation.mutate(orderId);
  };

  const rows = ordersQuery.data.map((order) => {
    if (active && order.actual_return_date) { return null; }
    return (
      <Table.Tr key={order.id}>
        <Table.Td>{order.user?.name}</Table.Td>
        <Table.Td>{order.document?.title}</Table.Td>
        <Table.Td>{getOrderStatus(order)}</Table.Td>
        <Table.Td>{order.order_date}</Table.Td>
        <Table.Td>{order.max_return_date}</Table.Td>
        <Table.Td>{order.actual_return_date || 'No devuelto'}</Table.Td>
        <Table.Td>
        {
          !order.actual_return_date &&
          <ActionIcon onClick={() => handleFinishOrder(order.id)}>
            <IconChecks className="icon sm c-white" size={20} />
          </ActionIcon>
        }
        </Table.Td>
      </Table.Tr>
    );
  });

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
  const [active, setActive] = useState(true);

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
        <Checkbox
          checked={active}
          onChange={() => setActive(!active)}
          label="Mostrar solo órdenes activas"
        />
      </div>
      <Content searchFilter={searchFilter} active={active} />
    </div>
  );
};

export default Orders;
