import axios from "axios";
import { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleName = (e: { target: { value: string }; }) => {
        setName(e.target.value);
    };

    const handlePassword = (e: { target: { value: string }; }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Form validation
        if (!name.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const userData = JSON.stringify({
                username: name,
                password: password
            });

            const response = await axios.post('https://ecommerce-python.vercel.app/api/v1/jwt/create/', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.access;
            console.log("Logged in successfully");
            localStorage.setItem('token', token);
            window.location.href = "/";
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error('Error submitting registration:', error);
        }
    };

    return (
        <div className="container_form-login">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Login</h1>

                <div className="form-group">
                    <label htmlFor="name">User Name</label>
                    <input type="text" id="name" onChange={handleName} value={name} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handlePassword} value={password} />
                </div>
                <div className="checkbox-container">
                    <div className="">

                        <input type="checkbox" />Remember password
                    </div>

                    <Link className="a" to="/register">Sign-up</Link>

                </div>
                <button className="btn-login" type="submit">Submit</button>
                {error && <p className="error-message">{error}</p>}
            </form>

        </div>
    );

}

export default Login;
