import * as React from "react";
import { View, Text } from "./Themed";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

export default function FullScreenLoadingComponent(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          margin: 10,
          padding: 5,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {props.text}
      </Text>
      <ActivityIndicator color={Colors.constants.blue} size="large" />
    </View>
  );
}
