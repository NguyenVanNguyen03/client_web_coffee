import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/common'
import "./Cart.scss"
import { useShoppingContext } from '../../contexts/ShoppingContext'

const Cart = () => {
    const navigate = useNavigate()
    const { cartItems, totalPrice, increaseQty, decreaseQty, removeCartItem, clearCart } = useShoppingContext()

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 style={{ margin: "margin: 20px;" }}>Checkout</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Name Product</th>
                                <th>Price</th>
                                <th>Quanlity</th>
                                <th>Sale</th>
                                <th>Total</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => {
                                const itemTotal = item.price * item.qty;
                                const discountedPrice = formatCurrency(itemTotal * (item.discount / 100));
                                const totalPrice = formatCurrency(itemTotal - (itemTotal * (item.discount / 100)));

                                return (
                                    <tr key={item.id}>
                                        <td><img src={item.thumbnail} className='img-fluid' alt={item.name} /></td>
                                        <td>{item.name}</td>
                                        <td>{formatCurrency(item.price)}</td>
                                        <td>
                                            <button type="button" className="btn" onClick={() => decreaseQty(item.id)}><strong>-</strong></button>
                                            {item.qty}
                                            <button type="button" className="btn" onClick={() => increaseQty(item.id)}><strong>+</strong></button>
                                        </td>
                                        <td><span>- {discountedPrice} ({item.discount}%)</span></td>
                                        <td>{totalPrice}</td>
                                        <td>
                                            <button className="btn delete" onClick={() => removeCartItem(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className='text-end'><strong>Total: {formatCurrency(totalPrice)}</strong></div>
                    <div className='mt-5'>
                        <Link to='/products' className='btn btn-sm btn-primary me-2'>Add other</Link>
                        <button className='btn btn-sm btn-success' onClick={() => {
                            clearCart()
                            navigate('/products')
                        }}>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
