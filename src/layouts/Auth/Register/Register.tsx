import axios from "axios";
import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // Sử dụng state thực sự cho lỗi

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = JSON.stringify({
                email: email,
                username: name,
                password: password
            });

            const response = await axios.post('https://ecommerce-python.vercel.app/api/v1/users/', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registration successful:', response.data);
            window.location.href = "/";
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                if (responseData?.non_field_errors && responseData.non_field_errors.length > 0) {
                    setError(responseData.non_field_errors.join('. '));
                } else {
                    setError('This password is too short. It must contain at least 8 characters or this password is too common or this password is entirely numeric.');

                }
            } else {
                setError('An unexpected error occurred. Please try again later.');
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="user-email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleEmail} value={email} />
                </div>
                <div className="user-name">
                    <label htmlFor="name">User Name</label>
                    <input type="text" id="name" onChange={handleName} value={name} />
                </div>
                <div className="user-password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handlePassword} value={password} />
                </div>
                <button className="btn-register" type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>} {/* Hiển thị lỗi nếu có */}
        </div>
    )
}

export default Register;
