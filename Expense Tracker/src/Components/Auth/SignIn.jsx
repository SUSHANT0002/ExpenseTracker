import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
            localStorage.setItem('token', res.data.token); // Save the token to localStorage
            navigate('/add-expense'); // Redirect to the dashboard
        } catch (err) {
            console.error(err);
            alert('Invalid credentials or server error.');
        }
    };

    return (
        <div className='flex justify-center items-center flex-col' >

            <form className="signin mb-10 mt-10 w-6/12" onSubmit={handleSubmit}>
                <h2 className='text-3xl text-center font-semibold'>Sign In</h2>
                <div>

                    <input
                        placeholder='E-mail'
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>

                    <input
                        placeholder='Password'
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>

            <p>If you don't have an existing account please <a className='text-blue-600' href="/signup">Sign Up.</a> </p>
        </div>
    );
};

export default SignIn;
