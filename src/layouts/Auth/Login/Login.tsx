
import axios from "axios";
import { useState } from "react";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);



    const handleName = (e: { target: { value: string }; }) => {
        setName(e.target.value);
    }

    const handlePassword = (e: { target: { value: string }; }) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
            console.log("Logged in successfully")
            localStorage.setItem('token', token);
            window.location.href = "/";
        } catch (error) {

            setError('Invalid credentials. Please try again.');
            console.error('Error submitting registration:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="user-name">
                    <label htmlFor="name">User Name</label>
                    <input type="text" id="name" onChange={handleName} value={name} />
                </div>
                <div className="user-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handlePassword} value={password} />
                </div>
                <button className="btn-Login" type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
