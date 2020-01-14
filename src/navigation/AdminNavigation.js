import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AdminHomeScreen from "../screens/AdminScreens/AdminHomeScreen";
//-------> AdminUserManagmentTab
import UserManagmentScreen from "../screens/AdminScreens/UserManagmentScreens/UserManagmentScreen";
import AddWorkerScreen from "../screens/AdminScreens/UserManagmentScreens/AddWorkerScreen";
import InspectWorkerScreen from "../screens/AdminScreens/UserManagmentScreens/InspectWorkerScreen";
import SuspendWorkerScreen from "../screens/AdminScreens/UserManagmentScreens/SuspendWorkerScreen";
import UpdateWorkerScreen from "../screens/AdminScreens/UserManagmentScreens/UpdateWorkerScreen";
//-------> AdminUserStatisticsTab
import AdminStatisticsScreen from "../screens/AdminScreens/AdminStatisticsScreen";
//-------> LogoutTab
import LogoutScreen from "../screens/LogoutScreen";
// Load Icons
//=> Icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Load Icons
const homeIcon = <FontAwesome name="home" color="dodgerblue" size={35} />;
const userManagment = (
  <MaterialCommunityIcons name="worker" color="dodgerblue" size={35} />
);
const userStatistics = (
  <Ionicons name="ios-stats" color="dodgerblue" size={35} />
);
const logout = <AntDesign name="logout" color="dodgerblue" size={35} />;

const userManagmentFlow = createStackNavigator({
  UserManagment: UserManagmentScreen,
  AddWorker: AddWorkerScreen,
  UpdateWorker: UpdateWorkerScreen,
  SuspendWorker: SuspendWorkerScreen,
  InspectWorker: InspectWorkerScreen
});

const AdminNavigation = createBottomTabNavigator(
  {
    Home: AdminHomeScreen,
    userManagmentFlow: userManagmentFlow,
    AdminStatistics: AdminStatisticsScreen,
    logout: LogoutScreen
  },
  { tabBarOptions: { showLabel: false } }
);

//Icon setup for each tab
AdminHomeScreen.navigationOptions = { tabBarIcon: homeIcon };
userManagmentFlow.navigationOptions = { tabBarIcon: userManagment };
AdminStatisticsScreen.navigationOptions = { tabBarIcon: userStatistics };
LogoutScreen.navigationOptions = { tabBarIcon: logout };

export default AdminNavigation;
