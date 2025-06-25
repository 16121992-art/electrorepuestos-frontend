// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function fetchFromAPI<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  token?: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error en la petición');
  }

  return res.json();
}

