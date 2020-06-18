import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const AppBar = ({ title, total }) => {
  const navigation = useNavigation();
  function handleGoMain() {
    navigation.goBack();
  }
  return (
    <View style={styles.main}>
      <Text style={styles.title} >
        {title} - R${total}
      </Text>
      <TouchableOpacity onPress={handleGoMain}>
        <Icon name="arrow-left" color="#fff" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  main: {
    marginTop: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
