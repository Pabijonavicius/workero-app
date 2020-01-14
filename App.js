import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as RecordsProvider } from "./src/context/RecordsContext";
import { Provider as AdminProvider } from "./src/context/AdminContext";
import { Provider as TableProvider } from "./src/context/TableContext";
import { Provider as ErrorProver } from "./src/context/ErrorContext";
import { setNavigator } from "./src/navigationRef";

//Screens
//---> Sign In Screen
import SigninScreen from "./src/screens/AuthScreens/SigninScreen";
import ResolveAuthScreen from "./src/screens/AuthScreens/ResolveAuthScreen";
//====> Role Based Navigation
import UserNavigation from "./src/navigation/UserNavigation";
import AdminNavigation from "./src/navigation/AdminNavigation";

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Signin: SigninScreen,
  userFlow: UserNavigation,
  adminFlow: AdminNavigation
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ErrorProver>
      <RecordsProvider>
        <AuthProvider>
          <AdminProvider>
            <TableProvider>
              <App
                ref={navigator => {
                  setNavigator(navigator);
                }}
              />
            </TableProvider>
          </AdminProvider>
        </AuthProvider>
      </RecordsProvider>
    </ErrorProver>
  );
};
