import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import UserHomeScreen from "../screens/UserScreens/UserHomeScreen";
//-------> SubmitWorkPhotoTab
import SubmitPhotoScreen from "../screens/UserScreens/SubmitPhotoScreens/SubmitPhotoScreen";
import StartWorkdayScreen from "../screens/UserScreens/SubmitPhotoScreens/StartWorkdayScreen";
import AddAdditionalPhotoScreen from "../screens/UserScreens/SubmitPhotoScreens/AddAdditionalPhotoScreen";
import EndWorkdayScreen from "../screens/UserScreens/SubmitPhotoScreens/EndWorkdayScreen";
//-------> UserStatisticsTab
import UserStatisticsScreen from "../screens/UserScreens/UserStatisticsScreens/UserStatisticsScreen";
import UserStatisticsSettingsScreen from "../screens/UserScreens/UserStatisticsScreens/UserStatisticsSettingsScreen";
//-------> LogoutTab
import LogoutScreen from "../screens/LogoutScreen";

//=> Icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Load Icons
const homeIcon = <FontAwesome name="home" color="dodgerblue" size={35} />;
const submitPhoto = <MaterialIcons name="work" color="dodgerblue" size={35} />;
const userStatistics = (
  <Ionicons name="ios-stats" color="dodgerblue" size={35} />
);
const logout = <AntDesign name="logout" color="dodgerblue" size={35} />;

//Create Stack Navigator
const submitPhotoFlow = createStackNavigator({
  SubmitPhoto: SubmitPhotoScreen,
  StartWorkday: StartWorkdayScreen,
  AddAdditionalPhoto: AddAdditionalPhotoScreen,
  EndWorkday: EndWorkdayScreen
});

const statisticsFlow = createStackNavigator({
  UserStatistics: UserStatisticsScreen,
  UserStatisticsSettings: UserStatisticsSettingsScreen
});

// Create Bottom Navigator
const UserNavigation = createBottomTabNavigator(
  {
    Home: UserHomeScreen,
    submitPhotoFlow: submitPhotoFlow,
    UserStatistics: UserStatisticsScreen,
    logout: LogoutScreen
  },
  { tabBarOptions: { showLabel: false } }
);

//Icon setup for each tab
UserHomeScreen.navigationOptions = { tabBarIcon: homeIcon };
submitPhotoFlow.navigationOptions = { tabBarIcon: submitPhoto };
statisticsFlow.navigationOptions = { tabBarIcon: userStatistics };
LogoutScreen.navigationOptions = { tabBarIcon: logout };

export default UserNavigation;
