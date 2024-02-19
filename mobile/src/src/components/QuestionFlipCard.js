import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import { View, Text } from "./Themed";
import { Dimensions } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function QuestionFlipCard(props) {
  const theme = useColorScheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.card,
          {
            minHeight: height / 3,
            width: 0.95 * width,
          },
        ]}
      >
        <Text style={[styles.cardTitle]}>{props.title}</Text>
        <Icon.MaterialCommunityIcons
          name={"rotate-360"}
          size={100}
          color={Colors.constants.blue}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.constants.lightGrey,
    padding: 5,
    borderWidth: 3,
    margin: 5,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 50,
  },
});
