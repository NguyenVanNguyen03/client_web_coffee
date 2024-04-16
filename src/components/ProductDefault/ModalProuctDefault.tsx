import React from "react";
import "./ModalProuctDefault.scss"
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { formatCurrency } from "../../utils/common";
import { useShoppingContext } from "../../contexts/ShoppingContext";

type Product = {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    discount: number;
    amount: number;
    unit: string;
};

type ModalProps = {
    product: Product;
    closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ product, closeModal }) => {
    const { addCartItem } = useShoppingContext();
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}><FaTimes className="i" /></span>
                <div className="cardModal" key={product.id}>


                    <div className="card-headerModal" >
                        <img src={product.thumbnail} alt="ảnh coffee" className="coffee-imageModal" />
                    </div>


                    <div className="card-bodyModal">
                        <div className="ratingModal">
                            <span className="rating-valueModal">- {product.discount}%</span>
                        </div>
                        <div className="coffee-infoModal">
                            <h3 className="coffee-nameModal">{product.name}</h3>
                            <p className="coffee-priceModal">{formatCurrency(product.price)}</p>
                        </div>
                        <div className="content-and-buttonModal">

                            <p>Amount: {product.amount}</p>
                            <div className="button-group-productModal">
                                <button className="cart-buttonModal" onClick={() => addCartItem(product)}>
                                    <FaShoppingCart />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
