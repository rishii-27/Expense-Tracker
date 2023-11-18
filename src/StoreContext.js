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
        // Set the id from the response in the item
        const newItem = { id: data.name, ...item };
        console.log(newItem);

        // Update expenses in state
        setExpenses([...expenses, newItem]);
      });
  };
  console.log(expenses);

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

        const fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            category: data[key].category,
            description: data[key].description,
            moneySpent: data[key].moneySpent,
          });
        }

        console.log(fetchedExpenses);

        // const fetchedExpenses = Object.values(data).map((expense) => {
        //   return {
        //     category: expense.category,
        //     description: expense.description,
        //     moneySpent: expense.moneySpent,
        //   };
        // });
        setExpenses(fetchedExpenses);
      });
  };

  useEffect(() => fetchExpensesHandle(), []);

  const contextValue = {
    loginStatus: token,
    getToken: getIdToken,
    expenses: expenses,
    addExpense: addExpenseHandle,
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
