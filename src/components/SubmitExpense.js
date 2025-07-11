import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
function SubmitExpense({ onAdd }) {

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000); // Auto-clear after 5 sec
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrftoken = getCookie("csrftoken");

      await axios.post("http://localhost:8000/submit-expense/", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      });

      setMessage("✅ Expense submitted successfully!");
      setError(false);
      setFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
      });
    if (onAdd) onAdd();   
    } catch (error) {
      setMessage("❌ Error submitting expense.");
      setError(true);
      console.error(error);
    }
const highSpendAlert=async()=>{
  try{
    const responses=await axios.get("http://127.0.0.1:8000/get-expenses/");
    var sepSpend=(responses.data.expenses.map(expense=>expense.amount));
    var totalSpent=0;
    console.log(typeof(sepSpend));
    for (let i=0;i<sepSpend.length;i++){
         totalSpent +=sepSpend[i];
    }
    if(totalSpent >2000){
      alert("You have ")
    }
    console.log(totalSpent);
  }catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
}
highSpendAlert()
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


  return (<>
           {message && (
          <div
            className={`mt-4 text-center text-sm font-medium px-3 py-2 rounded-md ${
              error
                ? "text-red-600 bg-red-50 border border-red-200"
                : "text-green-700 bg-green-50 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-lg ">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4 ">Submit Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["description", "amount", "date"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === "description" ? "E.g. Office Supplies" :
                  field === "amount" ? "E.g. 99.99" :""
                  // field === "category" ? "E.g. Travel, Meals" : ""
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required={field !== "category"}
              />
            </div>
            // 
          ))}

          <div className="">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded-md text-sm font-semibold transition duration-200"
            >
              Submit Expense
            </button>
          </div>
        </form>
 
<h2 className=" font-bold pt-8 text-center text-indigo-700">
  Scroll down to see Expenses
  <div className="mt-2 flex justify-center animate-bounce">
    <ChevronDown className="h-6 w-6 text-indigo-500" />
  </div>
</h2>
      </div>
    </div>

    </>
  );
}

export default SubmitExpense;
