import React, { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();
import { api, incomesGet, expensesGet } from "../services/api";

const GlobalContextProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeSelected, setIncomeSelected] = useState(null);
  const [expenseSelected, setExpenseSelected] = useState(null);
  const incomesValue = incomes.map(income => income.value)  
  const expensesValue = expenses.map(expense => expense.value)  
  const totalIncome = incomesValue.reduce(
    (accumulator, item) => (accumulator += item),
    0
  ) * 1;
  const totalExpense = expensesValue.reduce(
    (accumulator, item) => (accumulator += item),
    0
  ) * 1;

  const balance = (totalIncome - totalExpense).toFixed(2)

  useEffect(() => {
    incomesGet.then((response) => {
      setIncomes(response.data);
    });
  }, []);

  const addIncomes = (name, value) => {
    api.post("create-incomes", { name, value }).then((response) => {
      const newIncome = response.data[0];
      setIncomes([...incomes, newIncome]);
    });
  };

  const deleteIncome = (id) => {
    api.delete(`delete-incomes/${id}`).then((response) => {
      setIncomes(incomes.filter((income) => income.id !== id));
    });
  };

  const findIncome = (id) => {
    setIncomeSelected(incomes.find((income) => income.id === id));
  };
  const updateIncome = (id, name, value) => {
    api.put(`update-Incomes/${id}`, { name, value }).then((response) => {
      const newList = incomes.map((income) =>
        income.id === id ? { id, name, value } : incomes
      );
      setIncomes(newList);
      setIncomeSelected(null);
    });
  };

  useEffect(() => {
    expensesGet.then((response) => {
      setExpenses(response.data);
    });
  }, []);

  const addExpenses = (name, value) => {
    api
      .post("create-expenses", {name, value})
      .then((response) => {

        const newExpenses = response.data[0];
        setExpenses([...expenses, newExpenses]);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  };

  const deleteExpenses = (id) => {
    api.delete(`delete-expenses/${id}`).then((response) => {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    });
  };

  const findExpense = (id) => {
    setExpenseSelected(expenses.find((expense) => expense.id === id));
  };
  
  const updateExpenses = (id, name, value) => {
    api.put(`update-expenses/${id}`, { name, value }).then((response) => {
      const newExpenses = expenses.map((expense) =>
        expense.id === id ? { id, name, value } : expenses
      );
      setExpenses(newExpenses);
      setExpenseSelected(null);
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        balance,
        totalIncome,
        incomes,
        addIncomes,
        deleteIncome,
        findIncome,
        incomeSelected,
        updateIncome,
        expenses,
        addExpenses,
        deleteExpenses,
        findExpense,
        updateExpenses,
        expenseSelected,
        totalExpense
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
