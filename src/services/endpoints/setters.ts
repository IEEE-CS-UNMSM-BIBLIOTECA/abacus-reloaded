import api from '@/services/config';
import { CreateAuthorPayload, CreateDocumentPayload, CreatePublisherPayload, CreateTagPayload } from '@/types';

export const addDocument = (data: CreateDocumentPayload) => {
  const res = api.post('/dashboard/document', data);
  return res;
};

export const addAuthor = (data: CreateAuthorPayload) => {
  const res = api.post('/dashboard/author', data);
  return res;
};

export const addTag = (data: CreateTagPayload) => {
  const res = api.post('/dashboard/tag', data);
  return res;
};

export const addPublisher = (data: CreatePublisherPayload) => {
  const res = api.post('/dashboard/publisher', data);
  return res;
};

export const finishOrder = (order_id: number) => {
  const res = api.post(`/dashboard/order/${order_id}`);
  return res;
};
