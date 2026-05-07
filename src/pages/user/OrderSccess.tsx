import { useParams } from "react-router-dom"

const OrderSuccess = () => {

  const { id } = useParams()

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-green-50">

      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-lg mb-2">
        Your order has been placed.
      </p>

      <p className="text-gray-600 mb-6">
        Order ID: {id}
      </p>

      <button
        onClick={() => window.location.href = "/"}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Go to Home
      </button>

    </div>
  )
}

export default OrderSuccess