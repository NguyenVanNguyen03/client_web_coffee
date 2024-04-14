import { useState, useEffect } from "react";
import "./ProductCard.scss";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

import { formatCurrency } from "../../utils/common";
import { useShoppingContext } from "../../contexts/ShoppingContext";

type Product = {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  discount: number;
  amount: number;
  contdiscountent: string;
  unit: string
}

const ProductCard = () => {
  const [loading, setLoading] = useState<boolean>(true); // State để đánh dấu trạng thái tải dữ liệu
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [visibleProductCount, setVisibleProductCount] = useState<number>(6);
  const { addCartItem } = useShoppingContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const resToken = await axios.post('https://ecommerce-python.vercel.app/api/v1/jwt/create/', {
          username: 'Admin',
          password: '123456',
        });

        const accessToken = resToken.data.access;

        const response = await axios.get('https://ecommerce-python.vercel.app/api/v1/product/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setProducts(response.data.data);
        setDisplayedProducts(response.data.data.slice(0, visibleProductCount));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchData();
  }, [visibleProductCount]);

  const handleShowMore = () => {
    setVisibleProductCount(visibleProductCount + 6);

  };

  return (
    <div className="cardsProduct-container">
      {loading ? ( // Hiển thị phần tử loading nếu đang tải dữ liệu
        <div className="loading-spinner">Loading...</div>
      ) : (
        displayedProducts.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-header">
              <img src={item.thumbnail} alt="ảnh coffee" className="coffee-image" />
              <div className="rating">
                <span className="rating-value">- {item.discount}%</span>
              </div>
            </div>
            <div className="card-body">
              <div className="coffee-info">
                <h3 className="coffee-name">{item.name}</h3>
                <p className="coffee-price">{formatCurrency(item.price)}</p>
              </div>
              <div className="content-and-button">

                <p>Amount: {item.amount}</p>
                <div className="button-group-product">
                  <button className="cart-button" onClick={() => addCartItem(item)}>
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {!loading && products.length > displayedProducts.length && (
        <button className="more-button" onClick={handleShowMore}>
          More
        </button>
      )}
    </div>
  );
};

export default ProductCard;


