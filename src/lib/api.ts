import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface Card {
  id: string;
  name: string;
  company: string;
  designation: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  notes?: string;
  cards: string[]; // Card IDs
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for API requests
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Cards API
export const cardsApi = {
  getAll: () => fetchApi<Card[]>('/cards'),
  getById: (id: string) => fetchApi<Card>(`/cards/${id}`),
  create: (data: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Card>) => 
    fetchApi<Card>(`/cards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchApi<void>(`/cards/${id}`, {
      method: 'DELETE',
    }),
  scan: (imageData: string) => 
    fetchApi<Partial<Card>>('/cards/scan', {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
    }),
};

// Contacts API
export const contactsApi = {
  getAll: () => fetchApi<Contact[]>('/contacts'),
  getById: (id: string) => fetchApi<Contact>(`/contacts/${id}`),
  create: (data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Contact>) => 
    fetchApi<Contact>(`/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchApi<void>(`/contacts/${id}`, {
      method: 'DELETE',
    }),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) => 
    fetchApi<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string) => 
    fetchApi<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  getCurrentUser: () => fetchApi<User>('/auth/me'),
};

// React Query Hooks
export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: cardsApi.getAll,
  });
};

export const useCard = (id: string) => {
  return useQuery({
    queryKey: ['cards', id],
    queryFn: () => cardsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cardsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Card> }) => 
      cardsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['cards', id] });
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cardsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

export const useScanCard = () => {
  return useMutation({
    mutationFn: cardsApi.scan,
  });
};

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getAll,
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: ['contacts', id],
    queryFn: () => contactsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) => 
      contactsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contacts', id] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}; 