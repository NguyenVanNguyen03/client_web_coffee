import "./Header.scss";
import logo from "../logo_coffee.svg";
import { CiSearch } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModelCart from "../../components/Cart/ModelCart/ModelCart";
import { useState } from "react";
import { useShoppingContext } from "../../contexts/ShoppingContext";

function Header() {
  const [isModelCartOpen, setIsModelCartOpen] = useState(false);

  const handleToggleModelCart = () => {
    setIsModelCartOpen(!isModelCartOpen);
  };

  const { cartQty } = useShoppingContext()

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Coffee Logo" className="coffee-logo" />
      </Link>

      <ul>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/products">Our Product</Link>
        </li>
        <li>
          <Link to="/service">Delivery</Link>
        </li>
      </ul>

      <div className="search-box">
        <CiSearch className="icon-search" />
        <input type="text" placeholder="Cappuccino" />
      </div>

      <div className="body-cart">
        <Link to="" >
          <FaCartPlus className="btn-cart" onClick={handleToggleModelCart} style={{ width: "25px", height: "25px" }} />
        </Link>
        <span className="Qty-Product">{cartQty}</span>
        {isModelCartOpen && <ModelCart />}

      </div>
    </div>

  );
}



export default Header;
