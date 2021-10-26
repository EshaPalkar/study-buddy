import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./NewGroupScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "NewGroupScreen">;
  route: RouteProp<MainStackParamList, "NewGroupScreen">;
}

export default function NewGroupScreen({ route, navigation }: Props) {

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("HomeScreen")} />
        <Appbar.Content title="New Group" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
    </>
  );
}
