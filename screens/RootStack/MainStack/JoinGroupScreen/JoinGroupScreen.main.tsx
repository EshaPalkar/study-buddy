import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import firebase from "firebase";
import { styles } from "./JoinGroupScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "JoinGroupScreen">;
}

export default function JoinGroupScreen({ navigation }: Props) {
  const [accessCode, setAccessCode] = useState("");
  const currentUserId = firebase.auth().currentUser!.uid;

  const joinGroup = () => {
    if (!accessCode){
      console.log("No access code");
    }
    try {
      const groupRef = firebase.firestore().collection("groups").doc(accessCode)
      groupRef.get().then((doc) => {
        if (doc.exists){
          let currentUserList = doc.data().users;
          if (!currentUserList.includes(currentUserId)){
            currentUserList = [...currentUserList, currentUserId]
          }
          groupRef.set({users: currentUserList})
        }
        else {
          console.log("No such document")
        }
      }).catch((error) => console.log(error.message))

      const profileRef = firebase.firestore().collection("userprofile").doc(currentUserId)
      profileRef.get().then((doc) => {
        if (doc.exists){
          let currentGroupList = doc.data().groups;
          if (!currentGroupList.includes(accessCode)){
            currentGroupList = [...currentGroupList, currentUserId]
          }
          groupRef.set({users: currentGroupList})
        }
        else {
          console.log("No such document")
        }
      }).catch((error) => console.log(error.message))
      // const userRef = firebase.firestore().collection("groups").doc(accessCode).set({
      //   accessCode: accessCode,
      //   users: [currentUserId],
      //   zoom:
    }
    catch {
      console.log("catch");
    }
  };


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
      <TextInput
        label="Group Access Code"
        value={accessCode}
        onChangeText={setAccessCode}
      ></TextInput>
      <Button onPress={joinGroup}>Submit</Button>
    </>
  );
}
