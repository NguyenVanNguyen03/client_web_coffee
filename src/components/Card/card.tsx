import "./card.scss";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Data_Card from "./Data_Card";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { formatCurrency } from "../../utils/common";




const CoffeeCard = () => {

  const { addCartItem } = useShoppingContext()

  return (
    <div className="cards-container">
      {Data_Card.map((item) => (
        <div className="card" key={item._id}>
          <div className="card-header">
            <img
              src={item.img}
              alt="Coffee"
              className="coffee-image"
            />
            <div className="rating">
              <span className="rating-value">{item.rating}</span>
              <FaStar className="star" />
            </div>
          </div>
          <div className="card-body">
            <div className="coffee-info">
              <h3 className="coffee-name">{item.name}</h3>
              <p className="coffee-price">{formatCurrency(item.price)}</p>
            </div>
            <div className="button-group">
              <button className="hot-button">Hot</button>
              <button className="cold-button">Cold</button>
              <button className="cart-button" onClick={() => addCartItem(item)}>
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeeCard;
