/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance } from 'axios';
import qs from 'qs';

export interface StrapiClientOptions {
  baseURL: string;
  token: string;
}

export class StrapiClient {
  private client: AxiosInstance;

  constructor({ baseURL, token }: StrapiClientOptions) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { encodeValuesOnly: true }),
      },
    });
  }

  async getEntries(collection: string, params?: any) {
    const res = await this.client.get(`/${collection}`, { params });
    return res.data;
  }

  async getEntry(collection: string, id: number) {
    const res = await this.client.get(`/${collection}/${id}`);
    return res.data;
  }

  async createEntry(collection: string, data: any, params?: any) {
    const res = await this.client.post(`/${collection}`, { data }, { params });
    return res.data;
  }

  async updateEntry(collection: string, id: number, data: any) {
    const res = await this.client.put(`/${collection}/${id}`, { data });
    return res.data;
  }

  async deleteEntry(collection: string, id: number) {
    const res = await this.client.delete(`/${collection}/${id}`);
    return res.data;
  }
}
