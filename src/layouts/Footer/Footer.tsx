
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div
      className="app-container"

    >
      <div className="email-input-container">
        <h1 className="content">Subscribe to get 50% discount price</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="email-input"
        />
        <Link to={"/products"}>
          <button className="subscribe-button">Order now</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
