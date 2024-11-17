import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/endpoints';

const Orders = () => {
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  console.log(ordersQuery.data);

  return (
    <>
      Orders;
    </>
  );
};

export default Orders;
