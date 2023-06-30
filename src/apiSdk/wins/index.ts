import axios from 'axios';
import queryString from 'query-string';
import { WinInterface, WinGetQueryInterface } from 'interfaces/win';
import { GetQueryInterface } from '../../interfaces';

export const getWins = async (query?: WinGetQueryInterface) => {
  const response = await axios.get(`/api/wins${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWin = async (win: WinInterface) => {
  const response = await axios.post('/api/wins', win);
  return response.data;
};

export const updateWinById = async (id: string, win: WinInterface) => {
  const response = await axios.put(`/api/wins/${id}`, win);
  return response.data;
};

export const getWinById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/wins/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWinById = async (id: string) => {
  const response = await axios.delete(`/api/wins/${id}`);
  return response.data;
};
