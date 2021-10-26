import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./JoinGroupScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "JoinGroupScreen">;
  route: RouteProp<MainStackParamList, "JoinScreen">;
}

export default function JoinGroupScreen({ route, navigation }: Props) {

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("HomeScreen")} />
        <Appbar.Content title="Join Group" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
    </>
  );
}
