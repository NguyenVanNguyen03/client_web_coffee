import imgAbout from "../../assets/images/cofe_About.png";
import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <div className="container-AboutPage">
      <div className="img-about">
        <img src={imgAbout} alt="" />
      </div>
      <div className="content-about">
        <h1>About us</h1>
        <h2>We provide quality coffee, and ready to deliver.</h2>
        <p>
          We are a company that makes and distributes delicious drinks. our main
          product is made with a secret recipe and available in stores
          worldwide.
        </p>
        <button>Get your coffee</button>
      </div>
    </div>
  );
}
