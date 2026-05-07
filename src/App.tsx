import { Routes, Route, } from "react-router-dom";
import Home from "./pages/user/Home";
import RestaurantMenu from "./pages/user/retaurentMenu";
import Signup from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import Cart from "./pages/user/Cart";
import Navbar from "./Component/Navbar";
import Checkout from "./pages/user/CheckOutPage";
import OrderSuccess from "./pages/user/OrderSccess";
import AdminDashboard from "./pages/admin/adminDashboard";
import Footer from "./Component/Footer";
import './App.css'
function App() {

  

  return (
    <div>

      {/* Navigation */}
      
        <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
        path="/restaurant/:id"
        element={<RestaurantMenu />}
      />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App