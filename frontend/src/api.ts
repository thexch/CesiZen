const API_URL = import.meta.env.VITE_API_URL

type User = {
  role: string
}

export function saveSession(token: string, user: User) {
  localStorage.setItem('token', token)
  localStorage.setItem('role', user.role)
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}

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

export async function updateProfile(email: string, name: string) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, name }),
  })

  if (!response.ok) {
    throw new Error('Impossible de modifier le profil.')
  }

  return response.json()
}

export async function deleteProfile(password: string) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  })

  if (!response.ok) {
    throw new Error('Mot de passe incorrect.')
  }
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

export async function updateAdminUser(
  id: number,
  role: string,
  isActive: boolean,
) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role, isActive }),
  })

  if (!response.ok) {
    throw new Error("Impossible de modifier l'utilisateur.")
  }

  return response.json()
}

export async function deleteAdminUser(id: number) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Impossible de supprimer l'utilisateur.")
  }
}

export async function getInformations() {
  const response = await fetch(`${API_URL}/informations`)

  if (!response.ok) {
    throw new Error('Impossible de charger les informations.')
  }

  return response.json()
}

export async function createInformation(title: string, content: string) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/admin/informations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  })

  if (!response.ok) {
    throw new Error("Impossible d'ajouter l'information.")
  }

  return response.json()
}

export async function deleteInformation(id: number) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/admin/informations/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Impossible de supprimer l'information.")
  }
}

export async function updateInformation(
  id: number,
  title: string,
  content: string,
) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/admin/informations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  })

  if (!response.ok) {
    throw new Error("Impossible de modifier l'information.")
  }

  return response.json()
}
