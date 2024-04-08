import OptionService from "../../components/option_service/option_service";
import "./SlideAbout.scss";

export default function SlideAboutPage() {
  return (
    <div className="container_slideAboutPage">
      <div className="content">
        <div className="text-container">
          <h1>What they say about us</h1>
          <p>
            We always provide the best service and always maintain the quality
            of coffee
          </p>
        </div>
      </div>
      <div className="slide">
        <OptionService />
      </div>
    </div>
  );
}
