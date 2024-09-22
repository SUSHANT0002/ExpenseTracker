import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const [error, setError] = useState('');

    // Fetch expenses on load
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/expenses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setExpenses(response.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching expenses');
            }
        };

        fetchExpenses();
    }, []);

    // Handle delete expense
    const handleDelete = async (id) => {
        console.log('Deleting expense with ID:', id); // Add this line to see if the ID is correct

        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/expenses/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setExpenses(expenses.filter(exp => exp._id !== id));
        } catch (err) {
            console.error('Error deleting expense:', err);
            setError('Error deleting expense');
        }
    };

    // Handle submit edit form
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/expenses/edit/${editExpense._id}`, {
                category: editExpense.category,
                amount: editExpense.amount,
                comments: editExpense.comments
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setExpenses(expenses.map(exp => exp._id === editExpense._id ? response.data : exp));
            setEditExpense(null); // Close the modal/form
        } catch (err) {
            console.error('Error editing expense:', err);
            setError('Error editing expense');
        }
    };

    // Handle edit button click (populate edit form)
    const handleEditClick = (expense) => {
        setEditExpense(expense); // Open modal with expense data
    };

    return (
        <div className='view mt-10 w-full flex flex-col justify-center items-center '>

            <h2 className='text-3xl mb-10 '>View Expenses</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table className='responsive-table'>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <tr key={expense._id}>
                                <td>{expense.category}</td>
                                <td>{expense.amount}</td>
                                <td>{new Date(expense.createdAt).toLocaleString()}</td>
                                <td>{new Date(expense.updatedAt).toLocaleString()}</td>
                                <td>{expense.comments || 'No comments'}</td>
                                <td style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <button className='edit' onClick={() => handleEditClick(expense)}>Edit</button>
                                    <button className='delete' onClick={() => handleDelete(expense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No expenses found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Edit Modal/Form */}
            {editExpense && (
                <div className="modal flex justify-center items-center flex-col mt-5 w-full">
                    <form onSubmit={handleEditSubmit} className='mb-10 mt-10 w-6/12' >
                        <h3 className='text-3xl mb-5 font-semibold'>Edit Expense</h3>
                        <div>

                            <input
                                placeholder='category'
                                type="text"
                                value={editExpense.category}
                                onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Amount'
                                type="number"
                                value={editExpense.amount}
                                onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Comments'
                                type="text"
                                value={editExpense.comments}
                                onChange={(e) => setEditExpense({ ...editExpense, comments: e.target.value })}
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditExpense(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewExpenses;
