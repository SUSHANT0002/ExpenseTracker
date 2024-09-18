import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditExpense = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(`/api/expenses/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setExpense(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchExpense();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/expenses/${id}`, expense, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            history.push('/view-expenses');
        } catch (err) {
            console.error(err);
        }
    };

    if (!expense) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={expense.category} onChange={(e) => setExpense({ ...expense, category: e.target.value })} />
            <input type="number" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
            <input type="text" value={expense.comments} onChange={(e) => setExpense({ ...expense, comments: e.target.value })} />
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default EditExpense;
