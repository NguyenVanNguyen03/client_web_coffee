import axios from "axios";
import { SetStateAction, useState } from "react";

function Register() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    }

    const handleName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setName(e.target.value);
    }

    const handlePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(email, name);

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
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting registration:', error);
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
        </div>
    )
}

export default Register;
