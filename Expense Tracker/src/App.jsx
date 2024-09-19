import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import AddExpense from './Components/Expenses/AddExpense';
import ViewExpenses from './Components/Expenses/ViewExpense';
// import ExpenseChart from './components/Expenses/ExpenseChart';
import PrivateRoute from './components/PrivateRoute';
// import EditExpense from './Components/Expenses/EditExpense';
// import DeleteExpense from './Components/Expenses/DeleteExpense';

function App() {
  return (
    <div className='app mt-10 text-center '>
      <div className='h-full w-full justify-center items-center   flex'>
        <Router>
          <div className='h-full w-2/3 '>
            <h1 className='text-5xl '>Expense Tracker</h1>
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              {/* Private Routes */}
              <Route path="/add-expense" element={<PrivateRoute isAuthenticated={true}><AddExpense /></PrivateRoute>} />
              <Route path="/view-expenses" element={<PrivateRoute isAuthenticated={true}><ViewExpenses /></PrivateRoute>} />


              {/* Default Route */}
              <Route index path='*' element={
                <div className='mt-10 font-bold'>
                  <h2>Welcome to the Expense Tracker</h2>
                  <p>Please <a className='text-blue-600' href="/login">login</a> to manage your expenses.</p>
                  <p>If you don't have an account Please <a className='text-blue-600' href="/signup">SignUp.</a></p>
                </div>
              } />

            </Routes>
          </div>
        </Router>
      </div>
      <div className='sidebar' >
        <ul >
          <a href="/signup">
            <li>
              SignUp
            </li>
          </a>
          <a href="/signin">
            <li>
              SignIn
            </li>
          </a>
          <a href="/add-expense">
            <li>
              Add Expense
            </li>
          </a>
          <a href="/view-expenses">
            <li>
              View Expense
            </li>
          </a>

        </ul>
      </div>
    </div>
  );
}

export default App;
