import { SigninPayload } from '@/types';

import api from '../config';

export const signIn = (data: SigninPayload) => {
  const res = api.post('/login/admin', data);
  return res;
};
