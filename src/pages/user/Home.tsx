import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Restaurant = {
  _id: string;
  name: string;
  image: string;
  location: string;
};

const Home = () => {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRestaurants = async () => {

     try {

        const res = await axios.get(
          "https://food-magic-backend.onrender.com/api/restaurants"
        );

        setRestaurants(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchRestaurants();

  }, []);

   // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          
          {/* Spinner */}
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-600 text-lg font-medium">
            Loading Restaurants...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

    {/* Header */}
    <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        🍽️ Explore Restaurants
      </h1>
      <p className="text-sm text-gray-500">
        Find your favorite food
      </p>
    </div>

    {/* Grid */}
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

      {restaurants.map((r) => (

        <Link key={r._id} to={`/restaurant/${r._id}`}>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">

            {/* Image */}
            <div className="relative">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 sm:h-44 md:h-48 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              <h2 className="absolute bottom-2 left-3 text-white text-lg font-semibold">
                {r.name}
              </h2>
            </div>

            {/* Info */}
            <div className="p-3 flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                📍 {r.location}
              </p>

              <span className="text-xs sm:text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
                View
              </span>
            </div>

          </div>

        </Link>

      ))}

    </div>
  </div>
  );
};

export default Home;