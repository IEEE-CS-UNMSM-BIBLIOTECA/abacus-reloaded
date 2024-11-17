import api from '@/services/config';
import { DocumentType, OrderType } from '@/types';

export const getOrders = async () => {
  const res = await api.get('/dashboard/orders');
  const data: OrderType[] = res.data || [];
  return data;
};

export const getDocuments = async () => {
  const res = await api.get('/dashboard/documents');
  const data: DocumentType[] = res.data || [];
  return data;
};

export const getAuthors = async () => {
  const res = await api.get('/dashboard/authors');
  const data = res.data || [];
  return data;
};

export const getLanguages = async () => {
  const res = await api.get('/dashboard/languages');
  const data = res.data || [];
  return data;
};

export const getPublishers = async () => {
  const res = await api.get('/dashboard/publishers');
  const data = res.data || [];
  return data;
};

export const getFormats = async () => {
  const res = await api.get('/dashboard/formats');
  const data = res.data || [];
  return data;
};

export const getGenders = async () => {
  const res = await api.get('/dashboard/genders');
  const data = res.data || [];
  return data;
};

export const getCountries = async () => {
  const res = await api.get('/dashboard/countries');
  const data = res.data || [];
  return data;
};

export const getTags = async () => {
  const res = await api.get('/dashboard/alltags');
  const data = res.data || [];
  return data;
};
