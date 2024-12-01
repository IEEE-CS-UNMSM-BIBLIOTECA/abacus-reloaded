import { Order } from '@/types';

const getOrderStatus = (order: Order) => {
  const maxReturnDate = new Date(order.max_return_date);
  const actualReturnDate = order.actual_return_date ? new Date(order.actual_return_date) : null;

  if (actualReturnDate) {
    if (actualReturnDate > maxReturnDate) {
      return 'Entregado tarde';
    }
    return 'Entregado a tiempo';
  }

  if (new Date() > maxReturnDate) {
    return 'Atrasado';
  }

  return 'En curso';
};

export default getOrderStatus;
