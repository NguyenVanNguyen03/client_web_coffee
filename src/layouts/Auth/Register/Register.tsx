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

    const handleSumit = async (e: { preventDefault: () => void; }) => {
        console.log(email, name)
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/users', {
                email: email,
                username: name,
                password: password
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting registration:', error);
        }
    }



    return (
        <div>
            <form action="" method="POST">
                <h1>Register</h1>
                <div className="user-email">
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={handleEmail} value={email} />
                </div>
                <div className="user-name">
                    <label htmlFor="">User Name</label>
                    <input type="text" onChange={handleName} value={name} />
                </div>
                <div className="user-password">
                    <label htmlFor="">Password Name</label>
                    <input type="text" onChange={handlePassword} value={password} />
                </div>
                <button className="btn-resgister" type="submit" onClick={handleSumit}>Submit</button>
            </form>
        </div>
    )
}

export default Register;