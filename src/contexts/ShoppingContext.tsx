import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

type ShoppingContextProviderProps = {
    children: ReactNode
}

type CartItem = {
    _id: number
    name: string
    price: number
    qty: number
    img: string
}

type ProductItem = {
    _id: number
    name: string
    price: number
    img: string
}

interface ShoppingContextType {
    cartQty: number
    totalPrice: number
    cartItems: CartItem[]
    increaseQty: (_id: number) => void
    decreaseQty: (_id: number) => void
    addCartItem: (item: ProductItem) => void
    removeCartItem: (_id: number) => void
    clearCart: () => void
}

const ShoppingContext = createContext<ShoppingContextType>({} as ShoppingContextType)

export const useShoppingContext = () => {
    return useContext(ShoppingContext)
}

export const ShoppingContextProvider = ({ children }: ShoppingContextProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const jsonCartData = localStorage.getItem('shopping_cart')
        return jsonCartData ? JSON.parse(jsonCartData) : []
    })

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems))
    }, [cartItems])

    const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0)

    const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0)

    const increaseQty = (_id: number) => {

        const currentCartItem = cartItems.find(item => item._id === _id)
        if (currentCartItem) {
            const newItems = cartItems.map(item => {
                if (item._id === _id) {
                    return { ...item, qty: item.qty + 1 }
                } else {
                    return item
                }
            })
            setCartItems(newItems)
        }
    }

    const decreaseQty = (_id: number) => {

        const currentCartItem = cartItems.find(item => item._id === _id)
        if (currentCartItem) {
            if (currentCartItem.qty == 1) {
                removeCartItem(_id)
            } else {
                const newItems = cartItems.map(item => {
                    if (item._id === _id) {
                        return { ...item, qty: item.qty - 1 }
                    } else {
                        return item
                    }
                })
                setCartItems(newItems)
            }

        }
    }

    const addCartItem = (product: ProductItem) => {

        if (product) {
            const currentCartItem = cartItems.find(item => item._id === product._id)
            if (currentCartItem) {
                const newItems = cartItems.map(item => {
                    if (item._id === product._id) {
                        return { ...item, qty: item.qty + 1 }
                    } else {
                        return item
                    }
                })
                setCartItems(newItems)
            } else {
                const newItem = { ...product, qty: 1 }
                setCartItems([...cartItems, newItem])
            }
        }
    }

    const removeCartItem = (_id: number) => {

        const currentCartItemIndex = cartItems.findIndex(item => item._id === _id)
        const newItems = [...cartItems]
        newItems.splice(currentCartItemIndex, 1)
        setCartItems(newItems)
    }

    const clearCart = () => {

        setCartItems([])
    }

    return (
        <ShoppingContext.Provider value={{ cartItems, cartQty, totalPrice, increaseQty, decreaseQty, addCartItem, removeCartItem, clearCart }}>
            {children}
        </ShoppingContext.Provider>
    )

}

export default ShoppingContext