import "./HomePage.scss";
import cofe1 from "../../assets/images/cofe1.png";
import { FaShoppingCart } from "react-icons/fa";
import CoffeeCard from "../../components/Card/card";
import AboutPage from "../About/AboutPage";
import OptionServicePage from "../Service/option_servicePage";
import ProductPage from "../Product/ProductPage";
import SlideAboutPage from "../SlideAbout/SlideAbout";

function HomePage() {
  return (
    <div className="Container">
      <div className="container-header">
        <div className="container-homepage">
          <div className="content-homepage">
            <h1>
              Enjoy your <h2>coffee</h2> before your activity
            </h1>
            <p>
              Boost your productivity and build your mood with a glass of coffee
              in the morning{" "}
            </p>
            <button className="button button1">
              Order now
              <FaShoppingCart className="icon-cart" />
            </button>
            <button className="button button2">More Menu</button>
          </div>
          <div className="img-homepage">
            <img src={cofe1} alt="" />
          </div>
        </div>
        <div className="Container-Popular">
          <h1>Popular Now</h1>
          <div className="container-card">
            <CoffeeCard />
          </div>
        </div>
      </div>
      <AboutPage />
      <OptionServicePage />
      <ProductPage />
      <SlideAboutPage />
    </div>
  );
}

export default HomePage;
