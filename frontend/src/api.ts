const API_URL = import.meta.env.VITE_API_URL

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Email ou mot de passe incorrect.')
  }

  return response.json()
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  })

  if (!response.ok) {
    throw new Error("Impossible de créer le compte.")
  }

  return response.json()
}

export async function getProfile() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Vous devez être connecté.')
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Session invalide.')
  }

  return response.json()
}

export async function getAdminUsers() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Vous devez être connecté.')
  }

  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Accès refusé.')
  }

  return response.json()
}
