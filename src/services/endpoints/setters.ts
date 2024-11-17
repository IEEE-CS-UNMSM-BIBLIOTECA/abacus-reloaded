import api from '@/services/config';
import { SubmitDocumentPayload } from '@/types';

export const addDocument = (data: SubmitDocumentPayload) => {
  const res = api.post('/dashboard/document', data);
  return res;
};
