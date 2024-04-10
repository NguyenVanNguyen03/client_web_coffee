import { Link } from "react-router-dom";
import "./ModelCart.scss";

import BodyModelCart from "./BodyModelCart";
import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { formatCurrency } from "../../../utils/common";

function ModelCart() {
    const { cartItems, totalPrice } = useShoppingContext();

    return (
        <div className='container_model-cart'>
            <h1>Your Cart</h1>
            <div className="body-cart">
                <table>
                    <thead>
                        <tr>
                            <th >Images</th>
                            <th >Name Product</th>
                            <th >Price</th>
                            <th >Quantity</th>
                            <th className="th-sale" >Sale</th>
                            <th >Total</th>
                            <th >Other</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => {
                            return (
                                <BodyModelCart key={item.id} {...item} />
                            )
                        })}
                    </tbody>
                </table>

                <div className="footer-cart">
                    <h4>Total: {formatCurrency(totalPrice)}</h4>

                    <Link to="/cart" className="checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default ModelCart;
