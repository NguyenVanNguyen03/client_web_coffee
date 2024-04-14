import { useState, useEffect } from "react";
import "./Category.scss";
import axios from "axios";
import { formatCurrency } from "../../utils/common";
import { FaShoppingCart } from "react-icons/fa";
import { useShoppingContext } from "../../contexts/ShoppingContext";


type Product = {
    id: number;
    name: string;
    icon_url: string;
}
type ProductCategory = {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    discount: number;
    amount: number;
    contdiscountent: string;
    unit: string
}

const CategoryCard = () => {
    const [loading, setLoading] = useState<boolean>(true); // State để đánh dấu trạng thái tải dữ liệu
    const [products, setProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [displayedCategory, setDisplayedCategory] = useState<ProductCategory[]>([]);
    const [visibleProductCount, setVisibleProductCount] = useState<number>(6);
    const { addCartItem } = useShoppingContext();
    const [nameCategory, setNameCategory] = useState("");




    useEffect(() => {

        const fetchData = async () => {
            try {
                const resToken = await axios.post('https://ecommerce-python.vercel.app/api/v1/jwt/create/', {
                    username: 'Admin',
                    password: '123456',
                });

                const accessToken = resToken.data.access;

                const response = await axios.get('https://ecommerce-python.vercel.app/api/v1/category/', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setProducts(response.data.data);
                setDisplayedProducts(response.data.data.slice(0, visibleProductCount));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Kết thúc tải dữ liệu
            }
        };

        fetchData();
    }, [visibleProductCount]);

    const handleShowMore = () => {
        setVisibleProductCount(visibleProductCount + 6);
    };



    const handleShowProduct = async (categoryId: number) => {
        try {

            const resToken = await axios.post('https://ecommerce-python.vercel.app/api/v1/jwt/create/', {
                username: 'Admin',
                password: '123456',
            });

            const accessToken = resToken.data.access;

            // Gửi yêu cầu để lấy danh sách sản phẩm của danh mục
            const res = await axios.get(`https://ecommerce-python.vercel.app/api/v1/category/${categoryId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            // Cập nhật danh sách sản phẩm được hiển thị
            setDisplayedCategory(res.data.data.products);
            setNameCategory(res.data.data.name);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="cardsCategory-container">
            {loading ? ( // Hiển thị phần tử loading nếu đang tải dữ liệu
                <div className="loading-spinner">Loading...</div>
            ) : (
                <>
                    <div className="container-category">
                        {displayedProducts.map((item) => (
                            <div className="card-category" key={item.id} onClick={() => handleShowProduct(item.id)}>

                                <div className="img-category">
                                    <img src={item.icon_url} alt="" />
                                </div>
                                <div className="name-category">{item.name}</div>

                            </div>
                        ))}
                    </div>
                    <h2>{nameCategory}</h2>
                    <div className="container_product-category">

                        {displayedCategory.map((item) => (
                            <div className="card" key={item.id}>

                                <div className="card-header">
                                    <img src={item.thumbnail} alt="ảnh coffee" className="coffee-image" />
                                    <div className="rating">
                                        <span className="rating-value">- {item.discount}%</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="coffee-info">
                                        <h3 className="coffee-name">{item.name}</h3>
                                        <p className="coffee-price">{formatCurrency(item.price)}</p>
                                    </div>
                                    <div className="content-and-button">
                                        <p>Amount: {item.amount}</p>
                                        <div className="button-group-product">
                                            <button className="cart-button" onClick={() => addCartItem(item)}>
                                                <FaShoppingCart />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {!loading && products.length > displayedProducts.length && (
                <button className="more-button" onClick={handleShowMore}>
                    More
                </button>
            )}
        </div>

    );
};

export default CategoryCard;