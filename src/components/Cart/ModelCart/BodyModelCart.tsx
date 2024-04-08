

import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { formatCurrency } from "../../../utils/common";
import "./ModelCart.scss";

type CardBodyProps = {
    _id: number;
    name: string;
    price: number;
    qty: number;
    img: string;
};

const BodyModelCart = ({ _id, name, price, qty, img }: CardBodyProps) => {
    const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext();

    return (
        <tr>
            <td><span><img src={img} alt="" style={{ width: "50px", height: "50px" }} /></span></td>
            <td><span>{name}</span></td>
            <td className="td-qty">
                <span>
                    <button onClick={() => decreaseQty(_id)}> - </button>
                    {qty}
                    <button onClick={() => increaseQty(_id)}> + </button>
                </span>
            </td>
            <td><span>{formatCurrency(price * qty)}</span></td>
            <td>
                <span><button className="btn-delette" onClick={() => removeCartItem(_id)}>Delete</button></span>

            </td>
        </tr>
    );
};

export default BodyModelCart;
