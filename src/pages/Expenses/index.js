import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import AppBar from "../../components/AppBar";
import { GlobalContext } from "../../context/GlobalContext";
import IconM1 from "react-native-vector-icons/MaterialIcons";
import IconM2 from "react-native-vector-icons/MaterialCommunityIcons";

const Expenses = () => {
  const {
    totalExpense,
    expenses,
    addExpenses,
    deleteExpenses,
    findExpense,
    updateExpenses,
    expenseSelected,
  } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (name === "" || value === "") {
      alert("Error");
    } else if (!expenseSelected) {
      addExpenses(name, value);
      setName("");
      setValue("");
    } else {
      updateExpenses(expenseSelected.id, name, value);
      setName("");
      setValue("");
    }
  }

  useEffect(() => {
    if (expenseSelected) {
      setName(expenseSelected.name);
      setValue(String(expenseSelected.value));
    } else {
      setName("");
      setValue("");
    }
  }, [expenseSelected]);

  return (
    <View style={styles.main}>
      <AppBar title="Expenses" total={totalExpense.toFixed(2)} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Expenses"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="value"
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{expenseSelected ? 'Edit' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(expenses) => String(expenses.id)}
        renderItem={({ item: expenses }) => (
          <View style={styles.expensesContainer}>
            <Text style={styles.expenseText}>{expenses.name}</Text>
            <Text style={styles.expenseText}>R$ {expenses.value}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.iconSpace}
                onPress={() => findExpense(expenses.id)}
              >
                <IconM1 name="edit" size={18} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteExpenses(expenses.id)}>
                <IconM2 name="trash-can" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1C2E42",
  },
  form: {
    marginTop: 40,
    paddingHorizontal: 12,
  },
  input: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#618F74",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#fff" },

  expensesContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    height: 50,
    alignItems: "center",
    borderRadius: 20,
  },
  expenseText: {
    color: "#000",
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconSpace: {
    marginRight: 12,
  },
});
