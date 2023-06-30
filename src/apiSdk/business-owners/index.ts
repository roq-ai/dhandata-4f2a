import axios from 'axios';
import queryString from 'query-string';
import { BusinessOwnerInterface, BusinessOwnerGetQueryInterface } from 'interfaces/business-owner';
import { GetQueryInterface } from '../../interfaces';

export const getBusinessOwners = async (query?: BusinessOwnerGetQueryInterface) => {
  const response = await axios.get(`/api/business-owners${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBusinessOwner = async (businessOwner: BusinessOwnerInterface) => {
  const response = await axios.post('/api/business-owners', businessOwner);
  return response.data;
};

export const updateBusinessOwnerById = async (id: string, businessOwner: BusinessOwnerInterface) => {
  const response = await axios.put(`/api/business-owners/${id}`, businessOwner);
  return response.data;
};

export const getBusinessOwnerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/business-owners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBusinessOwnerById = async (id: string) => {
  const response = await axios.delete(`/api/business-owners/${id}`);
  return response.data;
};
