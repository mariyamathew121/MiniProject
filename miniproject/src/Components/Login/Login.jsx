import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [formValue, setFormValue] = useState({ email: '', password: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = async (event) => {
        try {
            const response = await axios.post('http://localhost:8800/login', formValue, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { token, loginKey } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('loginKey', loginKey);
            const firstLetter = loginKey.charAt(0).toLowerCase();
            if (firstLetter === 'n') {
                window.location.href = '/nurse';
            } else if (firstLetter === 'd') {
                window.location.href = '/doctor';
            } else if (firstLetter === 'l') {
                window.location.href = '/labtech';
            } else {
                window.location.href = '/patient';
            }
        } catch (error) {
            console.log('An error occurred during login:', error);
            window.alert('Incorrect username or password. Please try again.');
        }
    };

    return (
        <div className="container1">
            <div className="header1">
                <div className="text1">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {action === "Login" ? <div></div> : (
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formValue.name}
                                onChange={handleInput}
                            />
                        </div>
                    )}
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input
                            type="email"
                            placeholder="Email-ID"
                            name="email"
                            value={formValue.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formValue.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="forgot-password">
                        Don't have an account?
                        <span onClick={() => { navigate("/signup"); }}>Click Here!</span>
                    </div>
                    <div className="submit-container">
                        <div
                            className={action === "Sign Up" ? "submit gray" : "submit"}
                            onClick={() => {
                                setAction("Login");
                                setFormValue({ email: '', password: '' });
                                handleSubmit();
                            }}
                        >
                            Login
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
