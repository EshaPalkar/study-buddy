import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./NewGroupScreen.styles";
import firebase from "firebase"

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "NewGroupScreen">;
  route: RouteProp<MainStackParamList, "NewGroupScreen">;
}

export default function NewGroupScreen({ route, navigation }: Props) {

  const [accessCode, setAccessCode] = useState("");
  const [zoom, setZoom] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUserId = firebase.auth().currentUser!.uid; 

  const newGroup = () => {
    if (!accessCode || !zoom){
      console.log("error")
      return
    }
    setLoading(true);
    try{
      console.log("here");
      firebase.firestore().collection("groups").doc(accessCode).set({
        accessCode: accessCode,
        users: [currentUserId],
        zoom: zoom
      });
      const userRef = firebase.firestore().collection("userprofile").doc(currentUserId);
      userRef.set({
        groups: [...userRef.get().data().groups, accessCode]
      })
      setLoading(false);
      navigation.goBack();
      
    }
    catch (eror){
      setLoading(false);
      console.log("error")
    }
  }
  
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
      <TextInput label="Access Code" value = {accessCode} onChangeText = {setAccessCode}></TextInput>
      <TextInput label="Zoom" value = {zoom} onChangeText = {setZoom}></TextInput>
      <Button loading={loading} onPress={newGroup}>Submit</Button>


    </>
  );
}
