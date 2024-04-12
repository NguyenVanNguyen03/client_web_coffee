import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.scss";

interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface ProductData {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    discount: number;
    amount: number;
    unit: string;
    is_public: boolean;
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}


function Admin() {
    const [usersData, setUsersData] = useState<UserData[]>([]);
    const [productsData, setProductsData] = useState<ProductData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [newUserData, setNewUserData] = useState<UserData>({
        id: 4,
        username: "",
        email: "",
        password: ""
    });
    const [newProductData, setNewProductData] = useState<ProductData>({
        id: 4,
        name: "",
        thumbnail: "",
        price: 0,
        discount: 0,
        amount: 0,
        unit: "",
        is_public: false,
        category_id: 4,
        created_at: "",
        updated_at: "",
        deleted_at: ""
    });

    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUsersData(token);
            getProductData(token);
            setIsLoggedIn(true);
        } else {
            setError("Bạn cần đăng nhập để lấy dữ liệu");
        }
    }, []);

    const getUsersData = async (token: string) => {
        try {
            const response = await axios.get('https://ecommerce-python.vercel.app/api/v1/users/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData: UserData[] = response.data;
            setUsersData(userData);
        } catch (error) {
            setError('Error fetching user data: ' + error);
        }
    };

    const getProductData = async (token: string) => {
        try {
            const response = await axios.get('https://ecommerce-python.vercel.app/api/v1/product/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const productData: ProductData[] = response.data.data;
            setProductsData(productData);
        } catch (error) {
            setError('Error fetching product data: ' + error);
        }
    };

    // CRUD USER
    const handleAddUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('https://ecommerce-python.vercel.app/api/v1/users/', newUserData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getUsersData(token);
                setNewUserData({ id: 4, username: "", email: "", password: "" });
            }
        } catch (error) {
            setError('Error adding new user: ' + error);
        }
    };

    const handleEditUser = (userId: number) => {
        const editingUser = usersData.find(user => user.id === userId);
        if (editingUser) {
            setNewUserData(editingUser);
            setEditingUserId(userId);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token && editingUserId) {
                await axios.put(`https://ecommerce-python.vercel.app/api/v1/users/${editingUserId}`, newUserData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getUsersData(token);
                setNewUserData({ id: 4, username: "", email: "", password: "" });
                setEditingUserId(null);
            }
        } catch (error) {
            setError('Error updating user: ' + error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.delete(`https://ecommerce-python.vercel.app/api/v1/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getUsersData(token);
            }
        } catch (error) {
            setError('Error deleting user: ' + error);
        }
    };




    // CRUD PRODUCT
    const handleAddProduct = async () => {
        console.log(newProductData);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('https://ecommerce-python.vercel.app/api/v1/product/', newProductData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getProductData(token);
                setNewProductData({
                    id: 4,
                    name: "",
                    thumbnail: "",
                    price: 0,
                    discount: 0,
                    amount: 0,
                    unit: "",
                    is_public: false,
                    category_id: 4,
                    created_at: "",
                    updated_at: "",
                    deleted_at: ""
                });

            }
        } catch (error) {
            setError('Error adding new product: ' + error);
        }
    };


    const handleEditProduct = (productId: number) => {
        const editingProduct = productsData.find(product => product.id === productId);
        if (editingProduct) {
            setNewProductData(editingProduct);
            setEditingProductId(productId);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token && editingProductId) {
                await axios.put(`https://ecommerce-python.vercel.app/api/v1/product/${editingProductId}`, newProductData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                getProductData(token);
                setNewProductData({
                    id: 4,
                    name: "",
                    thumbnail: "",
                    price: 0,
                    discount: 0,
                    amount: 0,
                    unit: "",
                    is_public: false,
                    category_id: 4,
                    created_at: "",
                    updated_at: "",
                    deleted_at: ""
                });
                setEditingProductId(null);
            }
        } catch (error) {
            setError('Error updating product: ' + error);
        }
    };


    return (
        <div className="container-admin">
            <div className="Users-Data">
                <h1>User Data</h1>
                <div>
                    <label htmlFor="Username">Username</label>
                    <input type="text" placeholder="Username" value={newUserData.username} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} />
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder="Email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} />
                    <label htmlFor="Password">Password</label>
                    <input type="password" placeholder="Password" value={newUserData.password} onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} />
                    <button className="add add-user" onClick={editingUserId ? handleUpdateUser : handleAddUser}>{editingUserId ? 'Update user' : 'Add user'}</button>
                </div>
                {error && <p>This password is too short. It must contain at least 8 characters or this password is too common or this password is entirely numeric. *Please Again*</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Other</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>

                                <td>
                                    <button className="update update-user" onClick={() => handleEditUser(user.id)}>Update</button>
                                    <button className="delete delete-user" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="Products-Data">
                <h1>Product Data</h1>
                <div>
                    <input type="text" placeholder="Thumbnail" value={newProductData.thumbnail} onChange={(e) => setNewProductData({ ...newProductData, thumbnail: e.target.value })} />
                    <input type="text" placeholder="Name" value={newProductData.name} onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })} />
                    <input type="number" placeholder="Price" value={newProductData.price} onChange={(e) => setNewProductData({ ...newProductData, price: parseInt(e.target.value) })} />
                    <input type="number" placeholder="Amount" value={newProductData.amount} onChange={(e) => setNewProductData({ ...newProductData, amount: parseInt(e.target.value) })} />
                    <input type="number" placeholder="Discount" value={newProductData.discount} onChange={(e) => setNewProductData({ ...newProductData, discount: parseInt(e.target.value) })} />
                    <input type="text" placeholder="Unit" value={newProductData.unit} onChange={(e) => setNewProductData({ ...newProductData, unit: e.target.value })} />
                    <input type="text" placeholder="Category ID" value={newProductData.category_id} onChange={(e) => setNewProductData({ ...newProductData, category_id: parseInt(e.target.value) })} />
                    <input type="text" placeholder="Created At" value={newProductData.created_at} onChange={(e) => setNewProductData({ ...newProductData, created_at: e.target.value })} />
                    <input type="text" placeholder="Updated At" value={newProductData.updated_at} onChange={(e) => setNewProductData({ ...newProductData, updated_at: e.target.value })} />
                    <input type="text" placeholder="Deleted At" value={newProductData.deleted_at} onChange={(e) => setNewProductData({ ...newProductData, deleted_at: e.target.value })} />
                    <button className="add add-product" onClick={editingProductId ? handleUpdateProduct : handleAddProduct}>{editingProductId ? 'Update product' : 'Add product'}</button>
                </div>
                {error && <p>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Discount</th>
                            <th>Unit</th>
                            <th>Other</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map((product, id) => (
                            <tr key={id}>
                                <td><img src={product.thumbnail} alt="" /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.amount}</td>
                                <td>{product.discount}%</td>
                                <td>{product.unit}</td>
                                <td>{product.category_id}</td>
                                <td>{product.created_at}</td>
                                <td>{product.updated_at}</td>
                                <td>{product.deleted_at}</td>
                                <td>
                                    <button className="update update-product" onClick={() => handleEditProduct(product.id)}>Update</button>
                                    <button className="delete delete-product" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isLoggedIn ? null : (
                <Link to="/login">
                    <button>Đăng nhập</button>
                </Link>
            )}
        </div>
    );
}

export default Admin;
