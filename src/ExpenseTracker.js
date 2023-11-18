import React, { useContext, useState } from "react";
import StoreContext from "./StoreContext";

const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited
  const StoreCtx = useContext(StoreContext);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    if (editingExpense) {
      // If editing an expense, update the existing expense
      StoreCtx.updateExpense({
        ...editingExpense,
        moneySpent,
        description,
        category,
      });

      // Reset editing state
      setEditingExpense(null);
    } else {
      // If not editing, add a new expense
      const newExpense = {
        moneySpent,
        description,
        category,
      };
      StoreCtx.addExpense(newExpense);
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
    StoreCtx.deleteExpense(id);
  };

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

      {StoreCtx.expenses.length > 0 && (
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
              {StoreCtx.expenses.map((expense) => (
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
                <th>₹ {StoreCtx.expenseTotal}</th>
                <th colSpan="2">Total</th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
