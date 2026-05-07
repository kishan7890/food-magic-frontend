const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              🍽️ FoodieApp
            </h2>
            <p className="text-sm text-gray-400">
              Discover the best food from your favorite restaurants near you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Cart</li>
              <li className="hover:text-white cursor-pointer">Orders</li>
              <li className="hover:text-white cursor-pointer">Login</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3">Popular</h3>
            <ul className="space-y-2 text-sm">
              <li>🍕 Pizza</li>
              <li>🍔 Burgers</li>
              <li>🍛 Biriyani</li>
              <li>🥤 Drinks</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm">📍 Bangalore, India</p>
            <p className="text-sm">📧 support@foodie.com</p>
            <p className="text-sm">📞 +91 9876543210</p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>© 2026 FoodieApp. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;