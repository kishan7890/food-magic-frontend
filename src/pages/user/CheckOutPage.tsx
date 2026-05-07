import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import {
  MapPin,
  Plus,
  CreditCard,
  Wallet,
  CheckCircle2,
} from "lucide-react"

type Address = {
  fullName: string
  phone: string
  city: string
  pincode: string
  addressLine: string
}

const Checkout = () => {

  const { user, loading } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selected, setSelected] = useState<number | null>(null)

  const [paymentMethod, setPaymentMethod] =
    useState<"cod" | "online">("cod")

  const [form, setForm] = useState<Address>({
    fullName: "",
    phone: "",
    city: "",
    pincode: "",
    addressLine: ""
  })

  const itemsTotal = cart.reduce((sum, restaurant) => {
  return (
    sum +
    restaurant.items.reduce(
      (sub, item) => sub + item.price * item.quantity,
      0
    )
  )
}, 0)

const deliveryFee = itemsTotal > 0 ? 40 : 0

const taxes = 20

const grandTotal =
  itemsTotal + deliveryFee + taxes

  // ================= AUTH =================

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin")
    }
  }, [user, loading, navigate])

  // ================= LOAD ADDRESS =================

  useEffect(() => {
    if (user) {
      axios.get(
        "https://food-magic-backend.onrender.com/api/address",
        { withCredentials: true }
      )
        .then(res => setAddresses(res.data))
    }
  }, [user])

  // ================= ADD ADDRESS =================

  const addAddress = async () => {

    if (
      !form.fullName ||
      !form.phone ||
      !form.city ||
      !form.pincode ||
      !form.addressLine
    ) {
      alert("Please fill all fields")
      return
    }

    const res = await axios.post(
      "https://food-magic-backend.onrender.com/api/address",
      form,
      { withCredentials: true }
    )

    setAddresses(res.data)

    setForm({
      fullName: "",
      phone: "",
      city: "",
      pincode: "",
      addressLine: ""
    })
  }

  // ================= PLACE ORDER =================

  const placeOrder = async () => {

    if (selected === null) {
      alert("Please select address")
      return
    }

    if (paymentMethod === "online") {
      alert("Online payment coming soon 🚀")
      return
    }

    const res = await axios.post(
      "https://food-magic-backend.onrender.com/api/orders/place",
      {
        address: addresses[selected],
        paymentMethod
      },
      { withCredentials: true }
    )

    navigate(`/order-success/${res.data.orderId}`)
  }

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-100 pb-28">

      {/* ================= HEADER ================= */}

      <div className="bg-white shadow-sm sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 py-5">

          <h1 className="text-3xl font-bold text-gray-800">
            Checkout
          </h1>

          <p className="text-gray-500 mt-1">
            Secure & fast order placement
          </p>

        </div>

      </div>

      {/* ================= MAIN ================= */}

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">

        {/* ================= LEFT ================= */}

        <div className="lg:col-span-2 space-y-6">

          {/* ================= ADDRESS ================= */}

          <div className="bg-white rounded-3xl shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-green-100 p-3 rounded-full">
                <MapPin className="text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Delivery Address
                </h2>

                <p className="text-gray-500 text-sm">
                  Select your delivery location
                </p>
              </div>

            </div>

            {addresses.length === 0 && (
              <div className="bg-gray-50 border rounded-2xl p-6 text-center text-gray-500">
                No saved addresses found
              </div>
            )}

            <div className="space-y-4">

              {addresses.map((addr, index) => (

                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                    selected === index
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-bold text-lg">
                        {addr.fullName}
                      </h3>

                      <p className="text-gray-600 mt-1">
                        {addr.addressLine}
                      </p>

                      <p className="text-gray-600">
                        {addr.city} - {addr.pincode}
                      </p>

                      <p className="text-gray-600">
                        {addr.phone}
                      </p>

                    </div>

                    {selected === index && (
                      <CheckCircle2 className="text-green-600" />
                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ================= ADD ADDRESS ================= */}

          <div className="bg-white rounded-3xl shadow-sm p-5">

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-blue-100 p-3 rounded-full">
                <Plus className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Add New Address
                </h2>

                <p className="text-gray-500 text-sm">
                  Save a new delivery address
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value
                  })
                }
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value
                  })
                }
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode: e.target.value
                  })
                }
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-400"
              />

            </div>

            <textarea
              placeholder="Full Address"
              value={form.addressLine}
              onChange={(e) =>
                setForm({
                  ...form,
                  addressLine: e.target.value
                })
              }
              className="border rounded-xl p-3 w-full mt-4 outline-none focus:ring-2 focus:ring-green-400"
              rows={4}
            />

            <button
              onClick={addAddress}
              className="mt-5 bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-2xl shadow-md"
            >
              Save Address
            </button>

          </div>

          {/* ================= PAYMENT ================= */}

          <div className="bg-white rounded-3xl shadow-sm p-5">

            <h2 className="text-2xl font-bold mb-5">
              Payment Method
            </h2>

            <div className="space-y-4">

              {/* COD */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="bg-green-100 p-3 rounded-full">
                    <Wallet className="text-green-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Cash on Delivery
                    </h3>

                    <p className="text-sm text-gray-500">
                      Pay after your order arrives
                    </p>
                  </div>

                </div>

              </div>

              {/* ONLINE */}
              <div
                onClick={() => {
                  setPaymentMethod("online")
                  alert("Online payment coming soon 🚀")
                }}
                className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                  paymentMethod === "online"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="bg-purple-100 p-3 rounded-full">
                    <CreditCard className="text-purple-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Online Payment
                    </h3>

                    <p className="text-sm text-gray-500">
                      UPI / Cards / Net Banking
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SUMMARY ================= */}

        <div>

          <div className="bg-white rounded-3xl shadow-md p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{itemsTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                 <span>₹{grandTotal}</span>
              </div>

            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-8 bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Checkout