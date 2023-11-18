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

  const expenseHandle = (item) => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json`,
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    setExpenses([...expenses, item]);
  };

  const expenseTotal = expenses.reduce((total, item) => {
    total = total + parseFloat(item.moneySpent);
    return total;
  }, 0);

  const fetchExpensesHandle = () => {
    fetch(
      `https://expense-tracker-8bc1e-default-rtdb.firebaseio.com/expenses.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const fetchedExpenses = Object.values(data).map((expense) => {
          return {
            category: expense.category,
            description: expense.description,
            moneySpent: expense.moneySpent,
          };
        });
        setExpenses(fetchedExpenses);
      });
  };

  useEffect(() => fetchExpensesHandle(), []);

  const contextValue = {
    loginStatus: token,
    getToken: getIdToken,
    expenses: expenses,
    addExpense: expenseHandle,
    expenseTotal: expenseTotal,
  };
  console.log(contextValue.expenseTotal);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
