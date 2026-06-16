// Auth state lives here, in one place, shared with the whole app via
// React context. Any component can call useAuth() to find out who is
// logged in or to trigger login/logout -- no prop drilling.

import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // localStorage survives page refreshes, so reading the token here
  // means a logged-in user stays logged in after hitting F5.
  // (Worth telling students: localStorage is readable by any JS on the
  // page, so XSS can steal the token. Fine for a demo, debatable for
  // production -- httpOnly cookies are the usual alternative.)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  // The user object ({ id, email, role }) comes from GET /users/me.
  // We keep it in state so components can do things like hide the
  // admin link for non-admins.
  const [user, setUser] = useState(null)

  // True while we're checking a stored token on page load. Without
  // this flag, ProtectedRoute would bounce the user to /login for a
  // split second on every refresh, before the /users/me call finishes.
  const [loading, setLoading] = useState(true)

  // Runs on mount and whenever the token changes: validate the token
  // against the backend and load the user it belongs to.
  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    apiRequest('/users/me', { token })
      .then(setUser)
      .catch(() => {
        // Token is expired or garbage -- clear it so the app treats
        // the visitor as logged out instead of looping on errors.
        localStorage.removeItem('token')
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  async function login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    localStorage.setItem('token', data.access_token)
    // Setting the token triggers the useEffect above, which fetches
    // the user. State stays consistent because there's a single path
    // from "token changed" to "user loaded".
    setToken(data.access_token)
  }

  async function register(email, password, role) {
    await apiRequest('/auth/register', {
      method: 'POST',
      body: { email, password, role },
    })
    // Registering doesn't return a token in our API, so log in right
    // after to get one. Two requests, but the backend stays simpler.
    await login(email, password)
  }

  function logout() {
    // "Logging out" with JWTs is purely client-side: the server keeps
    // no session, so forgetting the token is all there is to it. (The
    // token technically stays valid until it expires -- revoking JWTs
    // early needs a denylist, which is beyond this demo.)
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Tiny convenience hook so components write useAuth() instead of
// useContext(AuthContext) everywhere.
export function useAuth() {
  return useContext(AuthContext)
}
