import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import type { User } from "./AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ✅ check user on app load (/me)
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://food-magic-backend.onrender.com/api/auth/me",
          { withCredentials: true }
        )

        setUser(res.data.user)
        // console.log(res.data.user);

      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

  }, [])

  // ✅ login
  const login = async (data: { email: string; password: string }) => {

    await axios.post(
      "https://food-magic-backend.onrender.com/api/auth/login",
      data,
      { withCredentials: true }
    )

    // get user after login
    const res = await axios.get(
      "https://food-magic-backend.onrender.com/api/auth/me",
      { withCredentials: true }
    )

    setUser(res.data.user) 
    // console.log(res.data.user)
    return res.data.user;
  }

  // ✅ logout
  const logout = async () => {

    await axios.post(
      "https://food-magic-backend.onrender.com/api/auth/logout",
      {},
      { withCredentials: true }
    )

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}