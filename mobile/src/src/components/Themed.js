import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function Text(props) {
  const theme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultText
      style={[{ color: Colors[theme].text }, style]}
      {...otherProps}
    />
  );
}

export function View(props) {
  const theme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultView
      style={[{ backgroundColor: Colors[theme].bodyBackgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function ScrollView(props) {
  const theme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <DefaultScrollView
      style={[{ backgroundColor: Colors[theme].bodyBackgroundColor }, style]}
      {...otherProps}
    />
  );
}
