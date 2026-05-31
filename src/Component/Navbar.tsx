import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import {
  Menu,
  X,
  ShoppingCart,
  House,
  Package,
  User,
  Settings,
  Accessibility
} from "lucide-react"
import { LayoutDashboard } from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const Navbar = () => {

  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  // ================= STATES =================

  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // ================= REFS =================

  const desktopMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // ================= CART COUNT =================

  const cartCount = cart.reduce((total, restaurant) => {
    return (
      total +
      restaurant.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    )
  }, 0)

  // ================= CLICK OUTSIDE =================

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

      // Desktop
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setDesktopOpen(false)
      }

      // Mobile
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }

  }, [])

  return (

    <>

      {/* ================= TOP NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          Foods Magic 🍔
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <div className="hidden md:flex items-center gap-8">

          <Link className="hover:text-green-600 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-green-600 transition" to="/about">
            About
          </Link>

          <Link className="hover:text-green-600 transition" to="/orders">
            Track Orders
          </Link>

          {user?.role === "restaurant" && (
            <Link
              className="hover:text-green-600 transition flex items-center gap-2 font-medium text-green-600"
              to="/admin"
            >
              <LayoutDashboard size={18} />
              Admin
            </Link>
          )}

          {/* CART */}

          <Link
            to="/cart"
            className="relative hover:text-green-600 transition"
          >

            Cart

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}

          </Link>

          {/* ================= DESKTOP PROFILE ================= */}

          <div className="relative" ref={desktopMenuRef}>

            <button
              onClick={() => setDesktopOpen(!desktopOpen)}
              className="flex items-center gap-3"
            >

              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-green-500">
                <User size={18} />
              </div>

              {desktopOpen ? <X /> : <Menu />}

            </button>

            {/* ================= DESKTOP DROPDOWN ================= */}

            <AnimatePresence>

              {desktopOpen && (

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl p-4"
                >

                  {user ? (
                    <>

                      <div className="border-b pb-3 mb-3">

                        <p className="font-semibold text-gray-800">
                          {user.email}
                        </p>

                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2 py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        <User size={18} />
                        Profile
                      </Link>

                      <Link
                        to="/my-orders"
                        className="flex items-center gap-2 py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        <Package size={18} />
                        My Orders
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-2 py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        <Settings size={18} />
                        Settings
                      </Link>

                      <Link
                        to="/accessibility"
                        className="flex items-center gap-2 py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        <Accessibility size={18} />
                        Accessibility
                      </Link>

                      <button
                        onClick={() => {
                          logout()
                          setDesktopOpen(false)
                        }}
                        className="w-full mt-4 bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-xl"
                      >
                        Logout
                      </button>

                    </>
                  ) : (
                    <>

                      <Link
                        to="/signup"
                        className="block py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        Signup
                      </Link>

                      <Link
                        to="/signin"
                        className="block py-2 hover:text-green-600"
                        onClick={() => setDesktopOpen(false)}
                      >
                        Sign In
                      </Link>

                    </>
                  )}

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

        {/* ================= MOBILE MENU ================= */}

        <div className="md:hidden relative" ref={mobileMenuRef}>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-green-500">
              <User size={18} />
            </div>

            {mobileOpen ? <X /> : <Menu />}

          </button>

          {/* MOBILE DROPDOWN */}

          <AnimatePresence>

            {mobileOpen && (

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl p-4"
              >

                {user ? (
                  <>

                    <p className="font-semibold border-b pb-2 mb-2">
                      {user.email}
                    </p>

                    <Link
                      to="/profile"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/about"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      About
                    </Link>

                    <Link
                      to="/my-orders"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/settings"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Settings
                    </Link>

                    <Link
                      to="/accessibility"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Accessibility
                    </Link>

                    <button
                      onClick={() => {
                        logout()
                        setMobileOpen(false)
                      }}
                      className="w-full mt-3 bg-red-500 text-white py-2 rounded-xl"
                    >
                      Logout
                    </button>

                  </>
                ) : (
                  <>

                    <Link
                      to="/signup"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Signup
                    </Link>

                    <Link
                      to="/signin"
                      className="block py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign In
                    </Link>

                  </>
                )}

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around py-3 md:hidden z-50">

        <Link
          to="/"
          className="flex flex-col items-center text-sm"
        >
          <House size={20} />
          Home
        </Link>

        {user?.role === "restaurant" && (
          <Link
            to="/admin"
            className="flex flex-col items-center text-sm text-green-600"
          >
            <LayoutDashboard size={20} />
            Admin
          </Link>
        )}

        <Link
          to="/cart"
          className="relative flex flex-col items-center text-sm"
        >

          <ShoppingCart size={20} />
          Cart

          {cartCount > 0 && (
            <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}

        </Link>

        <Link
          to="/orders"
          className="flex flex-col items-center text-sm"
        >
          <Package size={20} />
          Orders
        </Link>

      </div>

    </>
  )
}

export default Navbar