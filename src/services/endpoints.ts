import { SigninPayload } from '@/types';

import api from './config';

export const signIn = (data: SigninPayload) => {
  const res = api.post('/login', data);
  return res;
};

export const getOrders = async () => {
  const res = await api.get('/dashboard/orders');
  const data = res.data || [];
  return data;
};
