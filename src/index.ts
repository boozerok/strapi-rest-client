/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';

export interface StrapiClientOptions {
  baseURL: string;
  token: string;
}

export class StrapiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor({ baseURL, token }: StrapiClientOptions) {
    this.baseURL = baseURL;
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request(url: string, options: RequestInit = {}, params?: any) {
    const queryString = params ? qs.stringify(params, { encodeValuesOnly: true }) : '';
    const fullUrl = `${this.baseURL}${url}${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('StrapiClient request error:', error);
      throw error;
    }
  }

  async getEntries(collection: string, params?: any) {
    return this.request(`/${collection}`, { method: 'GET' }, params);
  }

  async getEntry(collection: string, id: number) {
    return this.request(`/${collection}/${id}`, { method: 'GET' });
  }

  async createEntry(collection: string, data: any, params?: any) {
    return this.request(
      `/${collection}`,
      {
        method: 'POST',
        body: JSON.stringify({ data }),
      },
      params
    );
  }

  async updateEntry(collection: string, id: number, data: any) {
    return this.request(`/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async deleteEntry(collection: string, id: number) {
    return this.request(`/${collection}/${id}`, { method: 'DELETE' });
  }
}
