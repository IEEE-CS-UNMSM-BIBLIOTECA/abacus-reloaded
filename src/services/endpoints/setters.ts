import api from '@/services/config';
import { SubmitAuthorPayload, SubmitDocumentPayload, SubmitPublisherPayload, SubmitTagPayload } from '@/types';

export const addDocument = (data: SubmitDocumentPayload) => {
  const res = api.post('/dashboard/document', data);
  return res;
};

export const addAuthor = (data: SubmitAuthorPayload) => {
  const res = api.post('/dashboard/author', data);
  return res;
};

export const addTag = (data: SubmitTagPayload) => {
  const res = api.post('/dashboard/tag', data);
  return res;
};

export const addPublisher = (data: SubmitPublisherPayload) => {
  const res = api.post('/dashboard/publisher', data);
  return res;
};

export const finishOrder = (order_id: number) => {
  const res = api.post(`/dashboard/order/${order_id}`);
  return res;
};
