import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        comments: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const { category, amount, comments } = formData;

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
        if (!category) validationErrors.category = 'Category is required';
        if (!amount) validationErrors.amount = 'Amount is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Ensure token is being retrieved correctly
            if (!token) {
                setErrors({ server: 'No token found' });
                return;
            }
            // Make API request to backend
            const res = await axios.post(
                'http://localhost:5000/api/expenses',
                { category, amount, comments },
                { headers: { Authorization: `Bearer ${token}` } } // Attach token in the Authorization header
            );

            setSuccessMessage('Expense added successfully!');
            setFormData({
                category: '',
                amount: '',
                comments: ''
            });
            setErrors({});
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors({ server: err.response.data.msg || 'Server error' });
            } else {
                setErrors({ server: 'Network error or server not responding' });
            }
        }
    };

    return (
        <div className="add-expense-form  flex justify-center items-center flex-col">

            {/* Show success message */}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

            {/* Show server error */}
            {errors.server && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.server}</div>}

            <form onSubmit={handleSubmit} className='mb-10 mt-10 '>
                <h2 className='text-3xl font-semibold'>Add Expense</h2>
                <div>

                    <input
                        placeholder='Category'
                        type="text"
                        name="category"
                        value={category}
                        onChange={handleChange}
                        required
                    />
                    {errors.category && <span style={{ color: 'red' }}>{errors.category}</span>}
                </div>

                <div>

                    <input
                        placeholder='Amount'
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleChange}
                        required
                    />
                    {errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}
                </div>

                <div>

                    <input
                        placeholder='Comments(Optional)'
                        type="text"
                        name="comments"
                        value={comments}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Expense</button>
            </form>

        </div>
    );
};

export default AddExpense;
