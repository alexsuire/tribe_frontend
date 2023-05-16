import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SessionScreen from "./screens/SessionScreen";
import SpotsScreen from "./screens/SpotsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Signup_favorite_spots from "./screens/Signup_favorite_spots";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignupScreen from "./screens/SignupScreen";
import Signup_basic_infoScreen from "./screens/Signup_basic_infoScreen";
import Signup_levelScreen from "./screens/Signup_levelScreen";

import SigninScreen from "./screens/SigninScreen";
import SignupNationality from "./screens/Signup_nationality";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FavoriteSpotsScreens from "./screens/Signup_favorite_spots";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import count from "./reducers/count";
import Signup_level from "./screens/Signup_levelScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { users, count },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "waves";
          } else if (route.name === "Session") {
            iconName = "surfing";
          } else if (route.name === "Spots") {
            iconName = "map-search-outline";
          } else if (route.name === "Profile") {
            iconName = "account-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#0287D9",
        tabBarInactiveTintColor: "#8686AF",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Session" component={SessionScreen} />
      <Tab.Screen name="Spots" component={SpotsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="One_spotScreen" component={One_spotScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="Signup_basic_info"
            component={Signup_basic_infoScreen}
          />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
