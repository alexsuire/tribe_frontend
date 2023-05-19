import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SessionScreen from "./screens/SessionScreen";
import CreateSessionScreen from "./screens/CreateSessionScreen";
import CreateSessionDateScreen from "./screens/CreateSessionDateScreen";
import CreateSessionDescriptionScreen from "./screens/CreateSessionDescriptionScreen";
import SearchSpotsScreen from "./screens/SearchSpotsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MapScreen from "./screens/MapScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import SignupScreen1_basic_info from "./screens/SignupScreen1_basic_info";
import SignupScreen2_spots from "./screens/SignupScreen2_spots";
import SignupScreen3_final from "./screens/SignupScreen3_final";
import ReportScreen from "./screens/ReportScreen";
import { Provider } from "react-redux";
import users from "./reducers/users";
import count from "./reducers/count";
import map from "./reducers/map";
import SpotScreen from "./screens/SpotScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ users, count, map});
const persistConfig = {
  key: "Tribe",
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
      <Tab.Screen name="Spots" component={SearchSpotsScreen} />
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
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen
              name="Signup1_basic_info"
              component={SignupScreen1_basic_info}
            />
            <Stack.Screen
              name="Signup2_spots"
              component={SignupScreen2_spots}
            />
            <Stack.Screen
              name="Signup3_final"
              component={SignupScreen3_final}
            />
            <Stack.Screen name="SpotScreen" component={SpotScreen} />
            <Stack.Screen name="SessionScreen" component={SessionScreen} />
            <Stack.Screen name="CreateSessionScreen" component={CreateSessionScreen} />
            <Stack.Screen name="CreateSessionDateScreen" component={CreateSessionDateScreen} />
            <Stack.Screen name="CreateSessionDescriptionScreen" component={CreateSessionDescriptionScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="ReportScreen" component={ReportScreen} />
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
