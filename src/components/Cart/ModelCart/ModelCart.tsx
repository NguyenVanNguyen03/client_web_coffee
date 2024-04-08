import { Link } from "react-router-dom";
import "./ModelCart.scss";

import BodyModelCart from "./BodyModelCart";
import { useShoppingContext } from "../../../contexts/ShoppingContext";

function ModelCart() {
    const { cartItems, totalPrice } = useShoppingContext();

    return (
        <div className='container_model-cart'>
            <h1>Your Cart</h1>
            <div className="body-cart">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Images</th>
                            <th style={{ width: "22%" }}>Name Product</th>
                            <th style={{ width: "28%" }}>Quantity</th>
                            <th style={{ width: "15%" }}>Price</th>
                            <th style={{ width: "10%" }}>Other</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => {
                            return (
                                <BodyModelCart key={item._id} {...item} />
                            )
                        })}
                    </tbody>
                </table>

                <div className="footer-cart">
                    <h4>Total: {totalPrice}</h4>
                    <Link to="/cart" className="checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default ModelCart;
