import { createContext } from "react"

export type FoodItem = {
  name: string
  price: number
  quantity: number
}

export type CartItem = {
  restaurantId: string
  restaurantName: string
  items: FoodItem[]   // ✅ correct array
}

export type AddToCartItem = {
  name: string
  price: number
  restaurantId: string
  restaurantName: string
}

export type CartContextType = {
  cart: CartItem[]
  addToCart: (item: AddToCartItem) => void
  isLoadingAddToCart: boolean

  increaseQty: (restaurantId: string, name: string) => void
  decreaseQty: (restaurantId: string, name: string) => void
  removeItem: (restaurantId: string, name: string) => void
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  isLoadingAddToCart: false,
  increaseQty: () => {},
  decreaseQty: () => {},
  removeItem: () => {},
})