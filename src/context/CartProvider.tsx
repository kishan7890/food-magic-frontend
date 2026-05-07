import { useState, useEffect } from "react"
import axios from "axios"
import type { ReactNode } from "react"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { CartContext } from "./CartContext"
import type { AddToCartItem, CartItem } from "./CartContext"

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const { user } = useContext(AuthContext)
  const isLoggedIn = !!user

  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState<boolean>(false)

  // ✅ 🔥 Load cart from backend when user logs in
  useEffect(() => {
    if (user) {
      axios.get("https://food-magic-backend.onrender.com/api/cart", {
        withCredentials: true
      })
        .then(res => {
          setCart(res.data)
        })
        .catch(err => {
          console.log("Error fetching cart:", err)
        })
    }
  }, [user]) // runs when user logs in

  const addToCart = async (item: AddToCartItem) => {
    if (isLoggedIn) {

      let updatedCart = [...cart]

      // 🚨 If different restaurant → clear cart
      if (
        updatedCart.length > 0 &&
        updatedCart[0].restaurantId !== item.restaurantId
      ) {
        updatedCart = []
      }

      const restaurantIndex = updatedCart.findIndex(
        (r) => r.restaurantId === item.restaurantId
      )

      if (restaurantIndex !== -1) {
        const restaurant = updatedCart[restaurantIndex]

        const itemIndex = restaurant.items.findIndex(
          (i) => i.name === item.name
        )

        if (itemIndex !== -1) {
          restaurant.items[itemIndex].quantity += 1
        } else {
          restaurant.items.push({ ...item, quantity: 1 })
        }
      } else {
        updatedCart.push({
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          items: [{ ...item, quantity: 1 }],
        })
      }

      setCart(updatedCart)

      try {
        setIsLoadingAddToCart(true)
        // ✅ 2. Sync backend
        await axios.post(
          "https://food-magic-backend.onrender.com/api/cart/add",
          item,
          { withCredentials: true }
        )


        setIsLoadingAddToCart(false)
        alert("Item added to cart");
      } catch (error) {
        console.log(error)
      }

    } else {

      // ✅ Guest logic (already correct)
      // ✅ Guest logic (fixed for nested cart)

      let updatedCart = [...cart]

      // 🚨 Restrict 1 restaurant (Swiggy style)
      if (
        updatedCart.length > 0 &&
        updatedCart[0].restaurantId !== item.restaurantId
      ) {
        updatedCart = []
      }

      const restaurantIndex = updatedCart.findIndex(
        (r) => r.restaurantId === item.restaurantId
      )

      if (restaurantIndex !== -1) {
        const restaurant = updatedCart[restaurantIndex]

        const itemIndex = restaurant.items.findIndex(
          (i) => i.name === item.name
        )

        if (itemIndex !== -1) {
          // ✅ increase quantity
          restaurant.items[itemIndex].quantity += 1
        } else {
          // ✅ add new item
          restaurant.items.push({
            name: item.name,
            price: item.price,
            quantity: 1,
          })
        }
      } else {
        // ✅ new restaurant
        updatedCart.push({
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          items: [
            {
              name: item.name,
              price: item.price,
              quantity: 1,
            },
          ],
        })
      }

      setCart(updatedCart)
    }
  }

  // ✅ Increase Quantity
  const increaseQty = async (restaurantId: string, name: string) => {

  if (user) {
    await axios.put(
      "https://food-magic-backend.onrender.com/api/cart/increase",
      { restaurantId, name },
      { withCredentials: true }
    )

    const res = await axios.get(
      "https://food-magic-backend.onrender.com/api/cart",
      { withCredentials: true }
    )

    setCart(res.data)

  } else {

    // ✅ FIXED guest logic (nested)
    const updatedCart = cart.map((restaurant) => {
      if (restaurant.restaurantId !== restaurantId) return restaurant

      return {
        ...restaurant,
        items: restaurant.items.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    })

    setCart(updatedCart)
  }
}

  // ✅ Decrease Quantity
  const decreaseQty = async (restaurantId: string, name: string) => {

  if (user) {
    await axios.put(
      "https://food-magic-backend.onrender.com/api/cart/decrease",
      { restaurantId, name },
      { withCredentials: true }
    )

    const res = await axios.get(
      "https://food-magic-backend.onrender.com/api/cart",
      { withCredentials: true }
    )

    setCart(res.data)

  } else {

    const updatedCart = cart
      .map((restaurant) => {
        if (restaurant.restaurantId !== restaurantId) return restaurant

        const updatedItems = restaurant.items
          .map((item) =>
            item.name === name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)

        return {
          ...restaurant,
          items: updatedItems,
        }
      })
      // 👉 remove restaurant if no items left
      .filter((restaurant) => restaurant.items.length > 0)

    setCart(updatedCart)
  }
}


  // ✅ Remove Item
 const removeItem = async (restaurantId: string, name: string) => {

  if (user) {
    await axios.delete(
      "https://food-magic-backend.onrender.com/api/cart/remove",
      {
        data: { restaurantId, name },
        withCredentials: true
      }
    )

    const res = await axios.get(
      "https://food-magic-backend.onrender.com/api/cart",
      { withCredentials: true }
    )

    setCart(res.data)

  } else {

    const updatedCart = cart
      .map((restaurant) => {
        if (restaurant.restaurantId !== restaurantId) return restaurant

        const filteredItems = restaurant.items.filter(
          (item) => item.name !== name
        )

        return {
          ...restaurant,
          items: filteredItems,
        }
      })
      // 👉 remove restaurant if empty
      .filter((restaurant) => restaurant.items.length > 0)

    setCart(updatedCart)
  }
}

  return (
    <CartContext.Provider value={{ cart, addToCart, isLoadingAddToCart, increaseQty, decreaseQty, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}