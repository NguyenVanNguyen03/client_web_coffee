import { Link } from "react-router-dom";
import "./ModelCart.scss";

import BodyModelCart from "./BodyModelCart";
import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { formatCurrency } from "../../../utils/common";

function ModelCart() {
    const { cartItems, totalPrice } = useShoppingContext();
    const token = localStorage.getItem("token");

    // Kiểm tra nếu không có token, không hiển thị sản phẩm trong giỏ hàng
    if (!token) {
        return (
            <div className='container_model-cart '>
                <div className="cart-entry">
                    <h1>Your Cart</h1>
                    <img src="https://img.lovepik.com/photo/40017/0891.jpg_wh860.jpg" alt="" />
                    <p>Vui lòng đăng nhập để  đặt hàng.</p>
                    <button>
                        <Link className="a" to={"/login"}>Login</Link>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='container_model-cart'>
            <h1>Your Cart</h1>
            <div className="body-cart">
                <table>
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Name Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="th-sale">Sale</th>
                            <th>Total</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => {
                            return (
                                <BodyModelCart key={item.id} {...item} />
                            );
                        })}
                    </tbody>
                </table>

                <div className="footer-cart">
                    <h4>Total: {formatCurrency(totalPrice)}</h4>

                    <Link to="/cart" className="checkout">Checkout</Link>
                </div>
            </div>
        </div>
    );
}

export default ModelCart;
