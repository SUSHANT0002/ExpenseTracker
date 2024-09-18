import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                if (!token) {
                    setError('No token found');
                    return;
                }

                // Make API request to fetch expenses
                const res = await axios.get('http://localhost:5000/api/expenses', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in the Authorization header
                    }
                });

                setExpenses(res.data);
            } catch (err) {
                if (err.response && err.response.data) {
                    setError(err.response.data.msg || 'Server error');
                } else {
                    setError('Network error or server not responding');
                }
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>View Expenses</h2>

            <table style={{ border: '1px solid black' }}>
                <thead style={{ fontWeight: 'bold' }}  >
                    <tr>
                        <td style={{ border: '1px solid black' }}>Category</td>
                        <td style={{ border: '1px solid black' }}>Amount</td>
                        <td style={{ border: '1px solid black' }}>Comment</td>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((item, index) => (
                        <tr key={index} style={{ border: '1px solid black' }}>
                            <td style={{ border: '1px solid black' }}>{item.category}</td>
                            <td style={{ border: '1px solid black' }}>{item.amount}</td>
                            <td style={{ border: '1px solid black' }}>{item.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default ViewExpenses;
