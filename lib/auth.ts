// lib/auth.ts

export const TOKEN_KEY = 'electrorepuestos_token'

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al iniciar sesión')
  }

  const { access_token } = await res.json()
  setToken(access_token)
}