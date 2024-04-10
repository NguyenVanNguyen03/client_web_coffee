import { useState, useEffect } from "react";
import "./Category.scss";
import axios from "axios";


type Product = {
    id: number;
    name: string;
    icon_url: string;
}

const CategoryCard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [visibleProductCount, setVisibleProductCount] = useState<number>(6);

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
            }
        };

        fetchData();
    }, [visibleProductCount]);

    const handleShowMore = () => {
        setVisibleProductCount(visibleProductCount + 6);
    };

    return (
        <div className="cardsCategory-container">
            {displayedProducts.map((item) => (
                <div className="card-category" key={item.id}>
                    <div className="img-category">
                        <img src={item.icon_url} alt="" />
                    </div>
                    <div className="name-category">{item.name}</div>
                </div>
            ))}
            {products.length > displayedProducts.length && (
                <button className="more-button" onClick={handleShowMore}>
                    More
                </button>
            )}
        </div>
    );
};

export default CategoryCard;