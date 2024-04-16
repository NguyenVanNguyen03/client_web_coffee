import "./card.scss";
import { FaShoppingCart } from "react-icons/fa";
import Data_Card from "./Data_Card";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { formatCurrency } from "../../utils/common";
import { useState } from "react";
import Modal from "../ModalProuctDefault/ModalProuctDefault";

type Product = {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  discount: number;
  amount: number;
  unit: string

}


const CoffeeCard = () => {

  const { addCartItem } = useShoppingContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State lưu thông tin sản phẩm được chọn


  const handleProductDefault = (product: Product) => {
    setSelectedProduct(product);
  };
  // Function để đóng modal
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="cards-container">
      {selectedProduct && (
        <Modal product={selectedProduct} closeModal={closeModal} />
      )}
      {Data_Card.map((item) => (
        <div className="card" key={item.id}>
          <div className="card-header" onClick={() => handleProductDefault(item)}>
            <img
              src={item.thumbnail}
              alt="Coffee"
              className="coffee-image"
            />
            <div className="rating">
              <span className="rating-value">- {item.discount}%</span>
            </div>
          </div>
          <div className="card-body">
            <div className="coffee-info">
              <h3 className="coffee-name">{item.name}</h3>
              <p className="coffee-price">{formatCurrency(item.price)}</p>
            </div>
            <div className="button-group">
              <button className="hot-button">38</button>
              <button className="cold-button">39</button>
              <button className="cold-button">40</button>
              <button className="cold-button">...</button>
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
