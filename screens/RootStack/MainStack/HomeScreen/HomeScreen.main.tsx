import React, { useState, useEffect } from "react";
import { Image, View, FlatList, Switch, Text, TouchableOpacity } from "react-native";
import { Appbar, Button, IconButton, Card, Headline } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { ProfileModel } from "../../../../models/profile.js";
import { styles } from "./HomeScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleSwitch from 'toggle-switch-react-native'
/* 
  Remember the navigation-related props from Project 2? They were called `route` and `navigation`,
  and they were passed into our screen components by React Navigation automatically.  We accessed parameters 
  passed to screens through `route.params` , and navigated to screens using `navigation.navigate(...)` and 
  `navigation.goBack()`. In this project, we explicitly define the types of these props at the top of 
  each screen component.

  Now, whenever we type `navigation.`, our code editor will know exactly what we can do with that object, 
  and it'll suggest `.goBack()` as an option. It'll also tell us when we're trying to do something 
  that isn't supported by React Navigation!
*/
interface Props {
  navigation: StackNavigationProp<MainStackParamList, "HomeScreen">;
}

export default function HomeScreen({ navigation }: Props) {
  //const { profile } = route.params;
  const [isOnline, setIsOnline] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>(null);

  const currentUserId = firebase.auth().currentUser!.uid;

  useEffect(() => {
    const ref = firebase.firestore().collection("userprofile").doc(currentUserId);
    
    var doc_data = ref.get();
    doc_data.then( (data) => {
      const p: ProfileModel = {
        userID: data.get("userID"),
        isOnline: Boolean(isOnline),
        avatar : data.get("avatar")
      };
      setProfile(p);
      ref.set(p, true).then( () => {}).catch(error => console.log(error));
    }).catch(error => console.log(error));
    
  }, [isOnline]);
  
  const toggleStatus = (mode: Boolean) => {
    setIsOnline(mode);
  }
  const noEvents = () => {
    return (
      <SafeAreaView>
        <Headline >No Events so far! Add some!!</Headline>
        </SafeAreaView>
    )
  }

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action
          icon="exit-to-app"
          onPress={() => firebase.auth().signOut()}
        />
        <Appbar.Content title="Study Buddy" />
        <IconButton
          icon="account"
          color="#FFFFFF"
          size={30}
          onPress={() => navigation.navigate("ProfileScreen", {profile: profile})}
        />
      </Appbar.Header>
    );
  };
  
  const RenderOpt = ({ item }: { item: ProfileModel }) => {
    return (
      <SafeAreaView>
        <View style={styles.button}>
          <Button onPress = {() => navigation.navigate("NewGroupScreen") }> New Group </Button>
        </View>
        <View style={styles.button}>
          <Button onPress = {() => navigation.navigate("JoinGroupScreen") }> Join Group </Button>
        </View>
        </SafeAreaView>
    )
  }
  
  return (
    <>
      <Bar />
      <SafeAreaView>
        <View style={styles.toggle} > 
          <ToggleSwitch
            isOn={isOnline}
            onColor="green"
            offColor="red"
            label="Online"
            labelStyle={{ alignSelf: 'center', fontWeight: "900" }}
            size="large"
            onToggle={ () => toggleStatus(isOn => !isOn)}
          />
        </View>
        <View style={styles.button}>
          <Button onPress = {() => navigation.navigate("NewGroupScreen") }> New Group </Button>
        </View>
        <View style={styles.button}>
          <Button onPress = {() => navigation.navigate("JoinGroupScreen") }> Join Group </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
