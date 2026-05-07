import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"

const Cart = () => {

  const navigate = useNavigate()

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem
  } = useContext(CartContext)

  // ✅ Total
  const total = cart.reduce((sum, restaurant) => {
    return (
      sum +
      restaurant.items.reduce(
        (sub, item) => sub + item.price * item.quantity,
        0
      )
    )
  }, 0)

  return (

    <div className="min-h-screen bg-gray-100 pb-28">

      {/* ================= HEADER ================= */}

      <div className="bg-white shadow-sm sticky top-0 z-40">

        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">

          <div className="bg-green-100 p-3 rounded-full">
            <ShoppingCart className="text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Your Cart
            </h1>

            <p className="text-sm text-gray-500">
              Review your delicious items 🍔
            </p>
          </div>

        </div>

      </div>

      {/* ================= EMPTY CART ================= */}

      {cart.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-24 px-4">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            className="w-40 md:w-52 opacity-80"
          />

          <h2 className="text-2xl font-bold mt-6 text-gray-700">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            Looks like you haven’t added anything yet
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-500 hover:bg-green-600 transition text-white px-6 py-3 rounded-2xl shadow-md"
          >
            Browse Foods
          </button>

        </div>

      ) : (

        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:grid lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2">

              {cart.map((restaurant) => (

                <div
                  key={restaurant.restaurantId}
                  className="mb-8"
                >

                  {/* Restaurant Name */}
                  <div className="flex items-center justify-between mb-4">

                    <h2 className="text-xl font-bold text-gray-800">
                      {restaurant.restaurantName}
                    </h2>

                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {restaurant.items.length} items
                    </span>

                  </div>

                  {/* Items */}
                  <div className="space-y-4">

                    {restaurant.items.map((item, index) => (

                      <div
                        key={index}
                        className="bg-white rounded-3xl shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >

                        {/* LEFT */}
                        <div className="flex items-center gap-4 flex-1">

                          {/* Fake Food Image */}
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
                            className="w-20 h-20 rounded-2xl object-cover bg-gray-100 p-2"
                          />

                          <div>

                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h3>

                            <p className="text-gray-500 mt-1">
                              Delicious & freshly prepared
                            </p>

                            <p className="text-green-600 font-bold mt-2">
                              ₹{item.price}
                            </p>

                          </div>

                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center justify-between md:justify-end gap-4">

                          {/* Quantity */}
                          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-3">

                            <button
                              onClick={() =>
                                decreaseQty(
                                  restaurant.restaurantId,
                                  item.name
                                )
                              }
                              className="bg-white shadow w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="font-semibold text-lg">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQty(
                                  restaurant.restaurantId,
                                  item.name
                                )
                              }
                              className="bg-white shadow w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
                            >
                              <Plus size={16} />
                            </button>

                          </div>

                          {/* Remove */}
                          <button
                            onClick={() =>
                              removeItem(
                                restaurant.restaurantId,
                                item.name
                              )
                            }
                            className="bg-red-100 hover:bg-red-200 transition p-3 rounded-full"
                          >
                            <Trash2
                              size={18}
                              className="text-red-500"
                            />
                          </button>

                          {/* Price */}
                          <div className="font-bold text-lg text-gray-800 min-w-20 text-right">
                            ₹{item.price * item.quantity}
                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

            {/* ================= RIGHT SIDE SUMMARY ================= */}

            <div className="mt-10 lg:mt-0">

              <div className="bg-white rounded-3xl shadow-md p-6 sticky top-24">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                {/* Total */}
                <div className="space-y-4">

                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹40</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>₹20</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total + 40 + 20}</span>
                  </div>

                </div>

                {/* Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  disabled={cart.length === 0}
                  className="w-full mt-8 bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-lg disabled:bg-gray-400"
                >
                  Proceed To Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-4 border border-gray-300 hover:bg-gray-100 transition py-3 rounded-2xl"
                >
                  Add More Items
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Cart