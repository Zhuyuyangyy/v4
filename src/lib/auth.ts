export type AuthRole = 'student' | 'admin'

export interface AuthSession {
  role: AuthRole
  name: string
  account: string
  loginAt: string
}

export const AUTH_SESSION_KEY = 'edumind-auth-session'

export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthSession
    if (parsed.role !== 'student' && parsed.role !== 'admin') return null
    return parsed
  } catch {
    return null
  }
}

export function setAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY)
}
