import React from 'react';
import axios from 'axios';

const GetExpenses = ({ expenses, onDelete }) => {
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-expense/${id}/`);
      onDelete(id); // Let App.js update the list
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Your Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((exp) => (
            <div key={exp.id} className="bg-white shadow-md rounded-lg p-6 relative">
         <button
  onClick={() => deleteExpense(exp.id)}
  className="absolute top-2 right-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-1 text-sm rounded-md shadow-sm border border-red-300 transition"
  title="Delete"
>
  Delete
</button>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {exp.description}
              </h3>
              <p className="text-gray-600 mb-1">Amount: ₹{exp.amount}</p>
              <p className="text-gray-600 mb-1">Category: {exp.category}</p>
              <p className="text-gray-500 text-sm">Date: {exp.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetExpenses;
