import { createContext } from "react"

export type User = {
  id: string
  email: string
  role?: string
}

export type AuthContextType = {
  user: User | null
  login: (data: { email: string; password: string }) => Promise<User>
  logout: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    return {
      id: "",
      email: "",
      role: ""
    }
  },
  logout: async () => {},
  loading: false
})