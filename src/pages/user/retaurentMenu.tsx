import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { CartContext } from "../../context/CartContext";

type MenuItem = {
  name: string
  image: string
  price: number
  resturantId: string
  resturantName: string
}

type Restaurant = {
  name: string
  _id: string   // ✅ change this
  menu: MenuItem[]
}

const RestaurantMenu = () => {
  const { id } = useParams()

  const { addToCart, isLoadingAddToCart } = useContext(CartContext);
  console.log("isLoadingAddToCart:", isLoadingAddToCart)

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  useEffect(() => {

    const fetchRestaurant = async () => {

      const res = await axios.get(
        `https://food-magic-backend.onrender.com/api/restaurants/${id}`
      )
      //   console.log(res.data);
      setRestaurant(res.data)

    }

    fetchRestaurant()

  }, [id])

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading menu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          🍽️ {restaurant.name}
        </h1>
        <p className="text-sm text-gray-500">
          Explore delicious menu
        </p>
      </div>

      {/* Menu Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {restaurant.menu.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 sm:h-44 md:h-48 object-cover"
              />

              {/* Price badge */}
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                ₹{item.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between">

              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {item.name}
              </h2>

              {/* Button */}
              <button
                disabled={isLoadingAddToCart}
                onClick={() =>
                  addToCart({
                    ...item,
                    restaurantId: restaurant._id,
                    restaurantName: restaurant.name,
                  })
                }
                className={`mt-3 w-full py-2 rounded-xl text-white text-sm font-medium transition 
              ${isLoadingAddToCart
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 active:scale-95"
                  }`}
              >
                {isLoadingAddToCart ? "Adding..." : "Add to Cart"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RestaurantMenu