import { useState, useEffect } from "react";
import "./ProductCard.scss";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import axios from "axios";

import { formatCurrency } from "../../utils/common";
import { useShoppingContext } from "../../contexts/ShoppingContext";

type Product = {
  _id: number;
  img: string;
  rating: number;
  name: string;
  content: string;
  price: number;
}

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [visibleProductCount, setVisibleProductCount] = useState<number>(6);
  const { addCartItem } = useShoppingContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, visibleProductCount));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [visibleProductCount]);

  const handleShowMore = () => {
    setVisibleProductCount(visibleProductCount + 6);
  };

  return (
    <div className="cardsProduct-container">
      {displayedProducts.map((item) => (
        <div className="card" key={item._id}>
          <div className="card-header">
            <img src={item.img} alt="ảnh coffee" className="coffee-image" />
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
            <div className="content-and-button">
              <p>{item.content}</p>
              <div className="button-group-product">
                <button className="cart-button" onClick={() => addCartItem(item)} >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {products.length > displayedProducts.length && (
        <button className="more-button" onClick={handleShowMore}>
          More
        </button>
      )}
    </div>
  );
};

export default ProductCard;
