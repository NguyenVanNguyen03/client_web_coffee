import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductPage.scss";
export default function ProductPage() {
  return (
    <div className="container-product">
      <h1>Special menu for you</h1>
      <ProductCard />
    </div>
  );
}
