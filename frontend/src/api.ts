const API_URL = import.meta.env.VITE_API_URL

type User = {
  role: string
}

function getToken() {
  return localStorage.getItem('token')
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` }
}

async function request(path: string, options: RequestInit, errorMessage: string) {
  const response = await fetch(`${API_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export function saveSession(token: string, user: User) {
  localStorage.setItem('token', token)
  localStorage.setItem('role', user.role)
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}

export function login(email: string, password: string) {
  return request(
    '/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
    'Email ou mot de passe incorrect.',
  )
}

export function register(email: string, password: string, name: string) {
  return request(
    '/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    },
    'Impossible de créer le compte.',
  )
}

export async function getProfile() {
  if (!getToken()) {
    throw new Error('Vous devez être connecté.')
  }

  return request(
    '/auth/me',
    { headers: authHeaders() },
    'Session invalide.',
  )
}

export function updateProfile(email: string, name: string) {
  return request(
    '/auth/me',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ email, name }),
    },
    'Impossible de modifier le profil.',
  )
}

export function deleteProfile(password: string) {
  return request(
    '/auth/me',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ password }),
    },
    'Mot de passe incorrect.',
  )
}

export async function getAdminUsers() {
  if (!getToken()) {
    throw new Error('Vous devez être connecté.')
  }

  return request(
    '/admin/users',
    { headers: authHeaders() },
    'Accès refusé.',
  )
}

export function updateAdminUser(id: number, role: string, isActive: boolean) {
  return request(
    `/admin/users/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ role, isActive }),
    },
    "Impossible de modifier l'utilisateur.",
  )
}

export function deleteAdminUser(id: number) {
  return request(
    `/admin/users/${id}`,
    { method: 'DELETE', headers: authHeaders() },
    "Impossible de supprimer l'utilisateur.",
  )
}

export function getInformations() {
  return request(
    '/informations',
    {},
    'Impossible de charger les informations.',
  )
}

export function createInformation(title: string, content: string) {
  return request(
    '/admin/informations',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ title, content }),
    },
    "Impossible d'ajouter l'information.",
  )
}

export function updateInformation(id: number, title: string, content: string) {
  return request(
    `/admin/informations/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ title, content }),
    },
    "Impossible de modifier l'information.",
  )
}

export function deleteInformation(id: number) {
  return request(
    `/admin/informations/${id}`,
    { method: 'DELETE', headers: authHeaders() },
    "Impossible de supprimer l'information.",
  )
}
