import { useEffect, useState } from "react";
import axios from "axios";
import SubmitExpense from "./components/SubmitExpense";
import GetExpenses from "./components/GetExpenses";

function App() {
  const [expenses, setExpenses] = useState([]);

  // ✅ Fetch expenses once
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-expenses/");
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  // ✅ Run when App mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Called by SubmitExpense after POST
  const handleNewExpense = () => {
    fetchExpenses();
  };

  // ✅ Called by GetExpenses after DELETE
  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  return (
    <div>
      <SubmitExpense onAdd={handleNewExpense} />
      <GetExpenses expenses={expenses} onDelete={handleDelete} />
    </div>
  );
}

export default App;


