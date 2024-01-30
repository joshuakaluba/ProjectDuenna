import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import * as Icon from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function NoFavoriteQuestionsCard() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>
        You currently have no questions added to your favorites. Add more
        questions!
      </Text>

      <Icon.Octicons
        name={"heart"}
        size={140}
        color={Colors.constants.danger}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    padding: 5,
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
