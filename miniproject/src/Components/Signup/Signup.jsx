import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Sign Up");
    const [formValue, setFormValue] = useState({ name: '', email: '', password: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = async (event) => {

        // Email validation
        const emailPattern = /@(gmail\.com|hotmail\.com)$/;
        if (!emailPattern.test(formValue.email)) {
            window.alert('Please use an email ending with gmail.com or hotmail.com.');
            return;
        }

        // Password validation
        if (formValue.password.length < 8) {
            window.alert('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8800/signup', formValue, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            navigate("/login");
        } catch (error) {
            console.log('An error occurred during signup:', error);
            window.alert('Signup failed. Please check your details and try again.');
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
                        Already have an account?
                        <span onClick={() => { navigate("/login"); }}>Click Here!</span>
                    </div>
                    <div className="submit-container">
                        <div
                            className={action === "Login" ? "submit gray" : "submit"}
                            onClick={() => {
                                setAction("Sign Up");
                                setFormValue({ name: '', email: '', password: '' });
                                handleSubmit();
                            }}
                        >
                            Sign up
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;
