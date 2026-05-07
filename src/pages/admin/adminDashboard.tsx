import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  IndianRupee,
  Menu,
  Bell,
  Search,
  Plus,
  Clock3,
  Truck,
  CheckCircle2,
  Star,
  Settings,
  LogOut,
  Users,
  X
} from "lucide-react"

import { useState } from "react"

const AdminDashboard = () => {

  const [mobileMenu, setMobileMenu] = useState(false)

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}

      {mobileMenu && (

        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />

      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72 bg-white shadow-xl p-6
          transform transition-transform duration-300
          ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Top */}
        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-green-600">
              Foods Magic
            </h1>

            <p className="text-gray-500 mt-1">
              Restaurant Admin
            </p>

          </div>

          {/* Close Mobile */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(false)}
          >
            <X />
          </button>

        </div>

        {/* Menu */}
        <nav className="mt-10 space-y-3">

          <button className="w-full flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-2xl shadow">
            <LayoutDashboard />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <UtensilsCrossed />
            Menu Items
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <ShoppingBag />
            Orders
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <Users />
            Customers
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <IndianRupee />
            Earnings
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <Star />
            Reviews
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition">
            <Settings />
            Settings
          </button>

        </nav>

        {/* Bottom */}
        <div className="absolute bottom-6 left-6 right-6">

          <div className="bg-green-50 rounded-3xl p-4">

            <p className="font-semibold text-gray-800">
              Premium Dashboard 🚀
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Manage restaurant faster
            </p>

          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-2xl">
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="flex-1">

        {/* ================= HEADER ================= */}

        <header className="bg-white sticky top-0 z-30 shadow-sm">

          <div className="flex items-center justify-between px-4 lg:px-8 py-4">

            {/* Left */}
            <div className="flex items-center gap-3">

              {/* Mobile Menu */}
              <button
                className="lg:hidden"
                onClick={() => setMobileMenu(true)}
              >
                <Menu />
              </button>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Dashboard
                </h2>

                <p className="text-sm text-gray-500">
                  Welcome back 👋
                </p>

              </div>

            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-2xl">

                <Search size={18} className="text-gray-500" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none ml-2"
                />

              </div>

              {/* Notification */}
              <button className="relative bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition">

                <Bell size={20} />

                <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full" />

              </button>

              {/* Profile */}
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-12 h-12 rounded-full border-2 border-green-500 object-cover"
              />

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <div className="p-4 lg:p-8">

          {/* ================= STATS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    1,245
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">
                  <ShoppingBag className="text-green-600" />
                </div>

              </div>

            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Revenue
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    ₹48,920
                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">
                  <IndianRupee className="text-blue-600" />
                </div>

              </div>

            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Menu Items
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    86
                  </h2>

                </div>

                <div className="bg-orange-100 p-4 rounded-2xl">
                  <UtensilsCrossed className="text-orange-600" />
                </div>

              </div>

            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Customers
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    520
                  </h2>

                </div>

                <div className="bg-purple-100 p-4 rounded-2xl">
                  <Users className="text-purple-600" />
                </div>

              </div>

            </div>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-8 grid lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Orders
                </h2>

                <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-2xl flex items-center gap-2">
                  <Plus size={18} />
                  Add Item
                </button>

              </div>

              {/* Orders */}
              <div className="space-y-4">

                {/* Order */}
                <div className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition">

                  <div>

                    <h3 className="font-bold text-lg">
                      Order #12345
                    </h3>

                    <p className="text-gray-500">
                      Burger + Pizza + Coke
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
                      Preparing
                    </span>

                    <span className="font-bold text-lg">
                      ₹560
                    </span>

                  </div>

                </div>

                {/* Order */}
                <div className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition">

                  <div>

                    <h3 className="font-bold text-lg">
                      Order #12346
                    </h3>

                    <p className="text-gray-500">
                      Pasta + Fries
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      On Delivery
                    </span>

                    <span className="font-bold text-lg">
                      ₹420
                    </span>

                  </div>

                </div>

                {/* Order */}
                <div className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition">

                  <div>

                    <h3 className="font-bold text-lg">
                      Order #12347
                    </h3>

                    <p className="text-gray-500">
                      Momos + Shake
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                      Delivered
                    </span>

                    <span className="font-bold text-lg">
                      ₹300
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Delivery Status */}
              <div className="bg-white rounded-3xl shadow-sm p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Delivery Status
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Clock3 className="text-yellow-600" />
                      </div>

                      <p>Preparing</p>

                    </div>

                    <span className="font-bold">
                      12
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-blue-100 p-3 rounded-full">
                        <Truck className="text-blue-600" />
                      </div>

                      <p>On Delivery</p>

                    </div>

                    <span className="font-bold">
                      8
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircle2 className="text-green-600" />
                      </div>

                      <p>Delivered</p>

                    </div>

                    <span className="font-bold">
                      120
                    </span>

                  </div>

                </div>

              </div>

              {/* Reviews */}
              <div className="bg-white rounded-3xl shadow-sm p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold">
                    Ratings
                  </h2>

                  <Star className="text-yellow-500 fill-yellow-500" />
                </div>

                <h1 className="text-5xl font-bold mt-5">
                  4.8
                </h1>

                <p className="text-gray-500 mt-2">
                  Based on 2,420 reviews
                </p>

                <div className="mt-6 bg-gray-100 rounded-full h-3 overflow-hidden">

                  <div className="bg-green-500 h-full w-[90%]" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard