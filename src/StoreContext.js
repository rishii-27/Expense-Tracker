import React, { useState } from "react";

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
    setExpenses([...expenses, item]);
  };

  const expenseTotal = expenses.reduce((total, item) => {
    total = total + parseFloat(item.moneySpent);
    return total;
  }, 0);

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
