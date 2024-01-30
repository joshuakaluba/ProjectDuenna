import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import PrimaryButton from "./PrimaryButton";

export default function MoreInfoButtonSelection(props) {
  const theme = useColorScheme();
  return (
    <View>
      <PrimaryButton
        title={props.buttonTitle}
        onPress={props.onPress}
        disabled={props.disabled}
        icon={{
          name: props.icon && props.icon.name ? props.icon.name : "",
          color: props.icon && props.icon.color ? props.icon.color : "",
        }}
      />
      <Text style={[styles.text, { color: Colors[theme].text }]}>
        {props.labelText}
      </Text>
      {!!props.subLabelText && (
        <Text style={[styles.subLabelText, { color: Colors[theme].text }]}>
          {props.subLabelText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  subLabelText: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
