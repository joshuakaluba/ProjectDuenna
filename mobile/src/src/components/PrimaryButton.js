import * as React from "react";
import { Button, Icon } from "@rneui/themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function PrimaryButton(props) {
  const theme = useColorScheme();
  return (
    <Button
      loading={props.loading}
      disabled={props.disabled}
      loadingProps={{ size: "small", color: "white" }}
      buttonStyle={{
        backgroundColor: !!props.colorOverride
          ? props.colorOverride
          : !!props.invert
          ? Colors.constants.lightGrey
          : Colors.constants.blue,
        borderRadius: 5,
        height: 50,
        ...props.style,
      }}
      titleStyle={{
        fontWeight: "bold",
        fontSize: 18,
        color: !!props.invert
          ? Colors.constants.darkGrey
          : Colors.constants.white,
      }}
      containerStyle={{
        width: "100%",
      }}
      onPress={props.onPress}
    >
      {props.title}
      {!!props.icon && (
        <Icon
          style={{ paddingLeft: 10 }}
          name={props.icon.name}
          color={props.icon.color}
          type="font-awesome-5"
        />
      )}
    </Button>
  );
}
