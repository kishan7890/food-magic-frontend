import { createContext } from "react"

export type User = {
  id: string
  email: string
  role?: string
}

export type AuthContextType = {
  user: User | null
  login: (data: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false
})