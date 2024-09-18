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
        <div className="signup-form">
            <h2>Sign Up</h2>

            {/* Show success message */}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

            {/* Show server error */}
            {errors.server && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.server}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input
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
        </div>
    );
};

export default SignUp;
