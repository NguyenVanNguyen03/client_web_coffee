import axios from "axios";
import { useState } from "react";
import "./Register.scss"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form validation
        if (!email.trim() || !name.trim() || !password.trim()) {
            setError('Please enter email, username, and password.');
            return;
        }

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
            toast("Register success", { type: "success" })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                if (responseData?.non_field_errors && responseData.non_field_errors.length > 0) {
                    setError(responseData.non_field_errors.join('. '));
                } else {
                    setError('Weak password . Please try again later.');
                    console.error('Weak password . Please try again later.', error);
                }
            }
        }
    };

    return (
        <div className="container_form-register">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Register</h1>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleEmail} value={email} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">User Name</label>
                    <input type="text" id="name" onChange={handleName} value={name} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={handlePassword} value={password} />
                </div>
                <div className="checkbox-container">


                    <a href="#">Forgot password</a>


                    <Link to="/login">Login</Link>

                </div>
                <button className="btn-register" type="submit">Submit</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Register;