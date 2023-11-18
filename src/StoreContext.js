// StoreContext.js
import React, { useEffect, useState } from "react";

const StoreContext = React.createContext({});

export const StoreContextProvider = (props) => {
  const loggedInStatus = localStorage.getItem("token");
  const [token, setToken] = useState(!!loggedInStatus);
  const [expenses, setExpenses] = useState([]);

  const getIdToken = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const addExpenseHandle = (item) => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newItem = { id: data.name, ...item };
        setExpenses([...expenses, newItem]);
      });
  };

  const updateExpenseHandle = (updatedExpense) => {
    const updatedIndex = expenses.findIndex(
      (expense) => expense.id === updatedExpense.id
    );

    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses/${updatedExpense.id}.json`,
      {
        method: "PUT", // Use PATCH method for updating existing data
        body: JSON.stringify({
          moneySpent: updatedExpense.moneySpent,
          description: updatedExpense.description,
          category: updatedExpense.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error updating expense in Firebase:", data.error);
        } else {
          // Update the expense in state
          const updatedExpenses = [...expenses];
          updatedExpenses[updatedIndex] = updatedExpense;
          setExpenses(updatedExpenses);
        }
      });
  };

  const deleteExpense = (id) => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const contextValue = {
    loginStatus: token,
    getToken: getIdToken,
    expenses: expenses,
    addExpense: addExpenseHandle,
    updateExpense: updateExpenseHandle,
    expenseTotal: expenses.reduce((total, item) => {
      total = total + parseFloat(item.moneySpent);
      return total;
    }, 0),
    deleteExpense: deleteExpense,
  };

  const fetchExpensesHandle = () => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            category: data[key].category,
            description: data[key].description,
            moneySpent: data[key].moneySpent,
          });
        }
        setExpenses(fetchedExpenses);
      });
  };

  useEffect(() => fetchExpensesHandle(), []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
