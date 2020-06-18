import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ToastAndroid,
} from "react-native";
import AppBar from "../../components/AppBar";
import { GlobalContext } from "../../context/GlobalContext";
import IconM1 from "react-native-vector-icons/MaterialIcons";
import IconM2 from "react-native-vector-icons/MaterialCommunityIcons";
import { set } from "react-native-reanimated";

// import { Container } from './styles';

const Incomes = () => {
  const {
    incomes,
    addIncomes,
    deleteIncome,
    findIncome,
    incomeSelected,
    updateIncome,
    totalIncome,
  } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const toastError = () => {
    ToastAndroid.showWithGravity(
      "Empty name or value, please fill them",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const toastMensage = (mensage) => {
    ToastAndroid.showWithGravity(
      mensage,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  function handleSubmit() {
    if (name === "" || value === "") {
      toastError();
    } else if (!incomeSelected) {
      addIncomes(name, value);
      toastMensage("Income Add");
      setName("");
      setValue("");
    } else {
      updateIncome(incomeSelected.id, name, value);
      toastMensage("Income Updated");
      setName("");
      setValue("");
    }
  }

  useEffect(() => {
    if (incomeSelected) {
      setName(incomeSelected.name);
      setValue(String(incomeSelected.value));
    } else {
      setName("");
      setValue("");
    }
  }, [incomeSelected]);

  return (
    <View style={styles.main}>
      <AppBar title="Incomes" total={totalIncome.toFixed(2)} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Incomes"
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
          <Text style={styles.buttonText}>
            {incomeSelected ? "Edit" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={incomes}
        keyExtractor={(incomes) => String(incomes.id)}
        renderItem={({ item: incomes }) => (
          <View style={styles.incomeContainer}>
            <Text style={styles.incomeText}>{incomes.name}</Text>
            <Text style={styles.incomeText}>R$ {incomes.value}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.iconSpace}
                onPress={() => findIncome(incomes.id)}
              >
                <IconM1 name="edit" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteIncome(incomes.id);
                  toastMensage("Deleted Income");
                }}
              >
                <IconM2 name="trash-can" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Incomes;

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
    backgroundColor: "#B83A2E",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#fff" },

  incomeContainer: {
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
  incomeText: {
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
