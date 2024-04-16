import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/common'
import "./Cart.scss"
import { useShoppingContext } from '../../contexts/ShoppingContext'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface PayData {
    id: number;
    user_id: number;
    receiver_name: string;
    receiver_phone: string;
    receiver_address: string;
    is_ordered: true;
    is_paid: true;
    total: number;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}


const Cart = () => {
    const navigate = useNavigate()
    const { cartItems, totalPrice, increaseQty, decreaseQty, removeCartItem, clearCart } = useShoppingContext()
    const [error, setError] = useState<string | null>(null);
    const [newPayData, setNewPayData] = useState<PayData>({
        id: 2,
        user_id: 2,
        receiver_name: "NguyenPay",
        receiver_phone: "+8432611642",
        receiver_address: "Da Nang",
        is_ordered: true,
        is_paid: true,
        total: 100,
        description: "is paid",
        created_at: "2024-04-14T20:02:54Z",
        updated_at: "2024-04-14T20:04:06.876735Z",
        deleted_at: "2024-04-14T20:03:39Z",
    });
    // Trong hàm getPayData
    const getPayData = async (token: string) => {
        try {
            const response = await axios.get('https://ecommerce-python.vercel.app/api/v1/orders/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usePay: PayData[] = response.data;


            if (usePay.length > 0) {
                setNewPayData(usePay[0]);
            } else {
                setError('No pay data found');
            }
        } catch (error) {
            setError('Error fetching pay data: ' + error);
        }
    };

    // Trong hàm handleAddPay
    const handleAddPay = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('https://ecommerce-python.vercel.app/api/v1/orders/', newPayData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getPayData(token);
                toast("order has been successfully", { type: "success" })
                clearCart()
                navigate('/products')
            }
        } catch (error) {
            setError('Error pay: ' + error);
        }
    };


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
                                <th>Option</th>
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
                        <Link to='/products' className='btn btn-sm btn-primary me-2'>Add products</Link>
                        <button className='btn btn-sm btn-success' onClick={() => {
                            handleAddPay()

                        }}>Pay</button>
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart;
