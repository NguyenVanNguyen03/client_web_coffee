import "./HomePage.scss";
import { FaShoppingCart } from "react-icons/fa";
import CoffeeCard from "../../components/Card/card";

import ProductPage from "../Product/ProductPage";
import { Link } from "react-router-dom";
import CategoryPage from "../Category/CategoryPage";



function HomePage() {
  return (
    <div className="Container">
      <div className="container-header">
        <div className="container-homepage">
          <div className="content-homepage">
            <h1>
              Enjoy your <h2>products</h2> <br /> before your activity
            </h1>
            <p>
              Increase your productivity and improve your mood with shoe products added to your cart{" "}
            </p>
            <Link to={"/products"} className="btn-order">
              <button className="button button1">
                Order now
                <FaShoppingCart className="icon-cart" />
              </button>

            </Link>
            <Link to={"/products"}>
              <button className="button button2">More Menu</button>
            </Link>

          </div>
          <div className="img-homepage">
            <img src="https://mona.media/wp-content/uploads/2021/11/thuong-mai-dien-tu-la-gi.jpg" alt="" />
          </div>
        </div>
        <div className="Container-Popular">
          <h1>Popular Now</h1>
          <div className="container-card">
            <CoffeeCard />
          </div>
        </div>
      </div>

      <CategoryPage />
      <ProductPage />

    </div>
  );
}

export default HomePage;
