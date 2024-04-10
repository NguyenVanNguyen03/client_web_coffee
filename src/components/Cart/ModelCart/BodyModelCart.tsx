

import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { formatCurrency } from "../../../utils/common";
import "./ModelCart.scss";

type CardBodyProps = {
    id: number;
    name: string;
    qty: number;
    discount: number;
    price: number;
    thumbnail: string;
};
const BodyModelCart = ({ id, name, price, discount, qty, thumbnail }: CardBodyProps) => {
    const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext();

    // Tính toán giá trị để hiển thị
    const discountedPrice = formatCurrency((price * qty) * (discount / 100));
    const totalPrice = formatCurrency((price * qty - (price * qty * (discount / 100))));


    return (
        <tr>
            <td><span><img src={thumbnail} alt="" style={{ width: "50px", height: "50px" }} /></span></td>
            <td><span>{name}</span></td>
            <td><span>{formatCurrency(price)}</span></td>
            <td className="td-qty">
                <span>
                    <button onClick={() => decreaseQty(id)}> - </button>
                    {qty}
                    <button onClick={() => increaseQty(id)}> + </button>
                </span>
            </td>
            <td><span>- {discountedPrice} ({discount}%)</span></td>
            <td><span>{totalPrice}</span></td>
            <td>
                <span><button className="btn-delette" onClick={() => removeCartItem(id)}>Delete</button></span>
            </td>
        </tr>
    );
};

export default BodyModelCart;
