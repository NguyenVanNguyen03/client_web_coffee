import backgroundImage from "../../assets/images/bgr_cf.png"; // Import ảnh nền
import "./Footer.scss";

const Footer = () => {
  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="email-input-container">
        <h1 className="content">Subscribe to get 50% discount price</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="email-input"
        />
        <button className="subscribe-button">Order now</button>
      </div>
    </div>
  );
};

export default Footer;
