import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesAction } from "./Redux/expenses";
import { CSVLink } from "react-csv"; // Import the CSVLink component

const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  console.log(expenses);

  useEffect(() => {
    const fetchExpensesHandle = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = await response.json();

        console.log(data);

        for (const key in data) {
          dispatch(
            expensesAction.addExpense({
              id: key,
              category: data[key].category,
              description: data[key].description,
              moneySpent: data[key].moneySpent,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpensesHandle();
  }, [dispatch]);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    if (editingExpense) {
      const { id } = editingExpense; // Extract the id from editingExpense

      fetch(
        `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "PATCH", // Use PATCH for partial updates
          body: JSON.stringify({
            moneySpent,
            description,
            category,
          }),
        }
      );

      // If editing an expense, update the existing expense
      dispatch(
        expensesAction.updateExpense({
          ...editingExpense,
          moneySpent,
          description,
          category,
        })
      );

      // Reset editing state
      setEditingExpense(null);
    } else {
      // If not editing, add a new expense
      const newExpense = {
        moneySpent,
        description,
        category,
      };

      fetch(
        `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "POST",
          body: JSON.stringify(newExpense),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // Set the id from the response in the item
          const newItem = { id: data.name, expenses };
          console.log(newItem);

          dispatch(expensesAction.addExpense(newExpense));
        });
    }

    // Clear form fields
    setMoneySpent("");
    setDescription("");
    setCategory("");
  };

  const editHandle = (expense) => {
    // Set the expense details in the form when editing
    setMoneySpent(expense.moneySpent);
    setDescription(expense.description);
    setCategory(expense.category);

    // Set the expense being edited
    setEditingExpense(expense);
  };

  const deleteHandle = (id) => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(expensesAction.deleteExpense(id));
      });
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + parseInt(expense.moneySpent),
    0
  );

  const headers = [
    { label: "Money Spent", key: "moneySpent" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
  ];

  return (
    <div className="container mt-5">
      <h4>{editingExpense ? "Edit Expense" : "Add Expense"}</h4>
      <form onSubmit={handleExpenseSubmit}>
        <div className="form-group">
          <label htmlFor="moneySpent">Money Spent:</label>
          <input
            type="number"
            className="form-control"
            id="moneySpent"
            min="0"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {expenses.length > 0 && (
        <div className="row mt-4">
          <span className="border border-danger p-3">
            <h4 className="text-center">Expenses List</h4>
          </span>

          <table className="table border">
            <thead>
              <tr>
                <th scope="col">Money Spent</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Activity Button</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.moneySpent}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => editHandle(expense)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteHandle(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="table table-dark">
                <th>₹ {totalExpense}</th>
                <th colSpan="2">Total</th>
                <th>
                  {totalExpense > 10000 && (
                    <div className="text-center">
                      <button type="button" className="btn btn-success">
                        Activate Premium
                      </button>
                    </div>
                  )}
                </th>
              </tr>
            </tbody>
          </table>

          <div className="text-center mt-3">
            <CSVLink
              data={expenses}
              headers={headers}
              filename={"expenses.csv"}
              className="btn btn-secondary"
            >
              Download CSV
            </CSVLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
