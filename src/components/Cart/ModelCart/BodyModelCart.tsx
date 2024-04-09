

import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { formatCurrency } from "../../../utils/common";
import "./ModelCart.scss";

type CardBodyProps = {
    id: number;
    name: string;
    price: number;
    qty: number;
    thumbnail: string;
};

const BodyModelCart = ({ id, name, price, qty, thumbnail }: CardBodyProps) => {
    const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext();

    return (
        <tr>
            <td><span><img src={thumbnail} alt="" style={{ width: "50px", height: "50px" }} /></span></td>
            <td><span>{name}</span></td>
            <td className="td-qty">
                <span>
                    <button onClick={() => decreaseQty(id)}> - </button>
                    {qty}
                    <button onClick={() => increaseQty(id)}> + </button>
                </span>
            </td>
            <td><span>{formatCurrency(price * qty)}</span></td>
            <td>
                <span><button className="btn-delette" onClick={() => removeCartItem(id)}>Delete</button></span>

            </td>
        </tr>
    );
};

export default BodyModelCart;
