import * as React from "react";
import { Input } from "@rneui/themed";

export default function PrimaryInput(props) {
  return (
    <Input
      placeholder={props.placeholder}
      onChangeText={(value) => {
        props.onChangeText(value);
      }}
      multiline={!!props.multiline && props.multiline === true ? true : false}
      value={props.value}
      autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
      style={{
        textAlign:
          !!props.multiline && props.multiline === true ? "left" : "center",
        fontWeight: "bold",
      }}
      secureTextEntry={props.password ? true : false}
      keyboardType={props.keyboardType ? props.keyboardType : "default"}
    />
  );
}
