import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const newExpense = action.payload;
      const existingExpense = state.expenses.find(
        (expense) => expense.id === newExpense.id
      );

      if (existingExpense) {
        // If expense with the same ID already exists, update it
        Object.assign(existingExpense, newExpense);
      } else {
        // If expense with the ID doesn't exist, add a new expense
        state.expenses.push(newExpense);
      }
    },

    updateExpense: (state, action) => {
      const { id, moneySpent, description, category } = action.payload;
      const index = state.expenses.findIndex((expense) => expense.id === id);

      if (index !== -1) {
        state.expenses[index] = {
          ...state.expenses[index],
          moneySpent,
          description,
          category,
        };
      }
    },
    deleteExpense: (state, action) => {
      const idToDelete = action.payload;
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== idToDelete
      );
    },
  },
});

export const expensesAction = expensesSlice.actions;

export default expensesSlice.reducer;
