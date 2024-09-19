import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const { name, email, password, confirmPassword } = formData;

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear field-specific errors on input
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        const validationErrors = {};
        if (!name) validationErrors.name = 'Name is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!password) validationErrors.password = 'Password is required';
        if (password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Make API request to backend
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });

            setSuccessMessage('Signup successful! You can now log in.');
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});

            // Redirect to sign-in page
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors({ server: err.response.data.msg || 'Server error' });
            } else {
                setErrors({ server: 'Network error or server not responding' });
            }
        }
    };

    return (
        <div className="signup-form  flex justify-center items-center flex-col">

            {/* Show success message */}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

            {/* Show server error */}
            {errors.server && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.server}</div>}

            <form className='mb-10 mt-10 w-6/12' onSubmit={handleSubmit}>
                <h2 className='text-3xl font-semibold'>Sign Up</h2>
                <div>
                    <input
                        placeholder='Name'
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>

                <div>
                    <input
                        placeholder='E-mail'
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
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
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>

                <div>
                    <input
                        placeholder='Confirm Password'
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                </div>

                <button type="submit">Sign Up</button>
            </form>
            <p>If you have an existing account please <a className='text-blue-600' href="/signin">Sign In.</a> </p>

        </div>
    );
};

export default SignUp;
