import React from "react";
import "./ModalProuctDefault.scss"
import { FaTimes } from "react-icons/fa";
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
                        <h3 className="coffee-nameModal">{product.name}</h3>
                        <div className="ratingModal">
                            <p className="rating-valueModal">Discount: -{product.discount}%</p>

                            <p>Amount: {product.amount}</p>
                        </div>
                        <div className="price">
                            <p className="coffee-priceModal">Price: {formatCurrency(product.price)}</p>
                        </div>
                        <div className="content">
                            <p>We believe that each product is not just an item but also an experience, a story. With dedication and passion, we continuously strive to bring you the most unique, aesthetically pleasing, and high-quality products.</p>
                        </div>
                        <div className="button-group-productModal">
                            <button className="cart-buttonModal" onClick={() => addCartItem(product)}>
                                Add Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
