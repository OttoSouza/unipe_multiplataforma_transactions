import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/Main";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
// import { Container } from './styles';
const Stack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Incomes" component={Incomes} />
        <Stack.Screen name="Expenses" component={Expenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
