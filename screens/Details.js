import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";

import AppButton from "../components/AppButton";

const Stack = createStackNavigator();

export default function Details({ navigation, route }) {
  const { itemId, otherParam } = route.params;

  const [count, setCount] = useState(0);
  const [isOdd, setIsOdd] = useState(false);

  const onButtonPress = () => {
    Alert.alert("Button clicked!");
  };

  const countIncrementHandler = () => {
    setCount(count + 1);
    updateAsyncStorage(count + 1);
  };

  function updateAsyncStorage(count) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem("count");
        await AsyncStorage.setItem("count", JSON.stringify(count));
        return resolve(true);
      } catch (e) {
        return reject(e);
      }
    });
  }

  async function fetchCount() {
    const countStored = await AsyncStorage.getItem("count");

    if (countStored) {
      setCount(JSON.parse(countStored));
    }
  }

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    if (count % 2 === 0) {
      setIsOdd(true);
    } else {
      setIsOdd(false);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.text, styles.textTitle]}>{itemId}</Text>
        <Text style={styles.textTitle}>{otherParam}</Text>
      </View>
      <View style={styles.middleContainer}>
        <Image
          style={styles.image}
          source={
            isOdd
              ? require("../assets/images/smile1.png")
              : require("../assets/images/sad.png")
          }
        />
        <Text style={styles.textTitle}>{count}</Text>

        <AppButton countIncrementHandler={countIncrementHandler} />

        <Button title="Go to home page" onPress={() => navigation.popToTop()} />
      </View>
      <View style={styles.bottomContainer}>
        {/* <Button title="Button" onPress={onButtonPress} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "whitesmoke",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  text: {
    fontSize: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  counterBtn: {
    marginTop: 10,
    backgroundColor: "purple",
    padding: 20,
  },
  counterBtnText: {
    color: "white",
  },
  textTitle: {
    color: "red",
    fontSize: 25,
    fontWeight: "700",
  },
});
