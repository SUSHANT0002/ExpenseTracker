// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const ExpenseChart = () => {
//     const [data, setData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('/api/expenses/chart', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 const expenseData = response.data;
//                 const categories = expenseData.map(exp => exp.category);
//                 const amounts = expenseData.map(exp => exp.amount);

//                 setData({
//                     labels: categories,
//                     datasets: [{
//                         label: 'Expense Distribution',
//                         data: amounts,
//                         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#E7E9ED']
//                     }]
//                 });
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             <Pie data={data} />
//         </div>
//     );
// };

// export default ExpenseChart;
