import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import MainNavigator from "./navigation/MainNavigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Colors } from "./constants";
import ProfileScreen from "./Screen/ProfileScreen";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <MainNavigator />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
