import { useState } from "react";
import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

type FormData = {
  name: string;
  email: string;
  password: string;
};



const SignIn = () => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("User Data:", formData);

    // Later you will send this data to backend
    
    try {
      const loggedInUser = await login({
      email: formData.email,
      password: formData.password
    });
      
      // ✅ role based navigation
    if (loggedInUser.role === "restaurant") {

      navigate("/admin");

    } else {

      navigate("/");

    }
          // console.log(response);
        //   alert(response.data.message);
      } catch (error: unknown) {

          if (axios.isAxiosError(error)) {
              alert(error.response?.data?.message);
          } else {
              alert("Unexpected error occurred");
          }

      }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Sign In to your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default SignIn;