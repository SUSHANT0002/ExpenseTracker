import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import AddExpense from './Components/Expenses/AddExpense';
import EditExpense from './Components/Expenses/EditExpense';
import ViewExpenses from './Components/Expenses/ViewExpense';
import ExpenseChart from './components/Expenses/ExpenseChart';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <h1>Expense Tracker</h1>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Private Routes */}
          <Route path="/add-expense" element={<PrivateRoute isAuthenticated={true}><AddExpense /></PrivateRoute>} />
          <Route path="/edit-expense/:id" element={<PrivateRoute isAuthenticated={true}><EditExpense /></PrivateRoute>} />
          <Route path="/view-expenses" element={<PrivateRoute isAuthenticated={true}><ViewExpenses /></PrivateRoute>} />
          <Route path="/expense-chart" element={<PrivateRoute isAuthenticated={true}><ExpenseChart /></PrivateRoute>} />

          {/* Default Route */}
          <Route index element={
            <div>
              <h2>Welcome to the Expense Tracker</h2>
              <p>Please <a href="/login">login</a> to manage your expenses.</p>
              <p>If you don't have an account Please <a href="/signup">SignUp.</a></p>
            </div>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
