import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen/HomeScreen.main";
import NewGroupScreen from "./NewGroupScreen/NewGroupScreen.main";
import JoinGroupScreen from "./JoinGroupScreen/JoinGroupScreen.main";
import { ProfileModel } from "../../../models/profile";

export type MainStackParamList = {
  HomeScreen: { profile: ProfileModel };
  NewGroupScreen: { profile: ProfileModel };
  JoinGroupScreen: {};
  ProfileScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <MainStack.Screen
        name="NewGroupScreen"
        options={{ headerShown: false }}
        component={NewGroupScreen}
      />
      <MainStack.Screen
        name="JoinGroupScreen"
        options={{ headerShown: false }}
        component={JoinGroupScreen}
      />
    </MainStack.Navigator>
  );
}
