import * as React from "react";
import { View, Text } from "./Themed";
import PrimaryButton from "./PrimaryButton";

export default function FullScreenErrorComponent(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
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
      <PrimaryButton
        onPress={props.onPress}
        loading={props.loading}
        title={!!props.title ? props.title : "Retry"}
      />
    </View>
  );
}
