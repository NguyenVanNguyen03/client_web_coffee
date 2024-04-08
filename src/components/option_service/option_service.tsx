import Data_option_service from "./Data_option_service";
import "./option_service.scss";
const OptionService = () => {
  return (
    <div className="container-option_service">
      {Data_option_service.map((item) => (
        <div className="option_service" key={item.id}>
          <img src={item.img_option_service} alt="" />
          <h2>{item.title}</h2>
          <h3>{item.content}</h3>
        </div>
      ))}
    </div>
  );
};

export default OptionService;
