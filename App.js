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
import users from "./reducers/users";
import count from "./reducers/count";
import Signup_level from "./screens/Signup_levelScreen";
import One_spotScreen from "./screens/One_spotScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from '@reduxjs/toolkit';



const reducers = combineReducers({ users, count });
const persistConfig = {
  key: "applicationName",
  version: 1,
  storage: AsyncStorage,
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

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
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={HomeScreen} />
            <Stack.Screen
              name="Signup_basic_info"
              component={Signup_basic_infoScreen}
            />
            <Stack.Screen
              name="Signup_favorite_spots"
              component={Signup_favorite_spots}
            />
            {/* <Stack.Screen name="Signup_level" component={Signup_levelScreen} /> */}
            <Stack.Screen name="Level" component={Signup_level} />
            <Stack.Screen name="nationality" component={SignupNationality} />
            <Stack.Screen name="One_spot" component={One_spotScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
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
