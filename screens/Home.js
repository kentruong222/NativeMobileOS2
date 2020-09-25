import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textTitle]}>
        Simple React Native App
      </Text>
      <Text style={styles.text}>Exercise 1</Text>
      <Button
        title="Check out here!"
        onPress={() =>
          navigation.navigate("Details", {
            otherParam: "Emoji Clicker",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  textTitle: {
    color: "red",
    fontSize: 25,
    fontWeight: "700",
  },
});
