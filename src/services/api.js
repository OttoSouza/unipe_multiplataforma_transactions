import axios from "axios";

export const api = axios.create({
  baseURL: "https://finances-back.herokuapp.com/",
});

export const incomesGet = api.get("/list-incomes");
export const expensesGet = api.get("/list-expenses");