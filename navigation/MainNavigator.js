import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screen/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../components/LoginPage";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AllContactsScreen from "../Screen/AllContactsScreen";
import { useSelector } from "react-redux";

const tab = createBottomTabNavigator();
const stack = createStackNavigator();

const MainNavigator = () => {
  //const loggedIn = true;

  const loggedIn = useSelector((state) => state.isLogged);

  return (
    <NavigationContainer>
      <stack.Navigator>
        {loggedIn ? (
          <stack.Screen
            name="Profile"
            component={tabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <stack.Screen
            name="Home"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

const tabNavigator = () => {
  return (
    <tab.Navigator initialRouteName="Profile">
      <tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="Contacts"
        component={AllContactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
        }}
      />
    </tab.Navigator>
  );
};
export default MainNavigator;
