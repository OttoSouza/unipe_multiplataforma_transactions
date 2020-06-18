import React, { useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/GlobalContext";

const Main = () => {
  const { balance, totalIncome, totalExpense } = useContext(GlobalContext);
  const navigation = useNavigation();

  function goToIncomes() {
    navigation.navigate("Incomes");
  }
  function goToExpenses() {
    navigation.navigate("Expenses");
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>Save Your Maney</Text>
        <Text style={styles.subTitle}>
          Your Balance <Text style={styles.balance}>R$ {balance}</Text>{" "}
        </Text>
      </View>

      <View style={styles.transactionContainer}>
        <TouchableOpacity style={styles.buttonIncome} onPress={goToIncomes}>
          <Text style={styles.buttonText}>Incomes</Text>
          <Text style={styles.buttonText}>R$ {totalIncome.toFixed(2)}</Text>
          <Icon name="arrow-right" color="#fff" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonExpense} onPress={goToExpenses}>
          <Text style={styles.buttonText}>Expenses</Text>
          <Text style={styles.buttonText}>R$ {totalExpense.toFixed(2)}</Text>
          <Icon name="arrow-right" color="#fff" size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.social}>
        <TouchableOpacity style={styles.socialIcon} >
          <Icon name="github-circle" color="#fff" size={30} onPress={() => Linking.openURL('https://github.com/OttoSouza')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon} onPress={() => Linking.openURL('https://www.linkedin.com/in/otto-neto')}>
          <Icon name="linkedin-box" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#1C2E42",
  },
  balance: {
    color: "#618F74",
    fontWeight: "bold",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  subTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  transactionContainer: {
    width: "90%",
    marginTop: 40,
    padding: 24,
    justifyContent: "center",
  },

  buttonIncome: {
    backgroundColor: "#B83A2E",
    margin: 20,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonExpense: {
    backgroundColor: "#618F74",
    margin: 20,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  social: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialIcon: {
    marginRight: 24,
  },
});
