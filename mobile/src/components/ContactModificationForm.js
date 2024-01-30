import * as React from "react";
import { View } from "./Themed";
import PrimaryInput from "./PrimaryInput";
import PrimaryButton from "./PrimaryButton";

export default function ContactModificationForm(props) {
  return (
    <View
      style={{
        width: "100%",
        margin: 5,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      <PrimaryInput
        placeholder={"Contact Name"}
        value={props.name}
        autoCapitalize={"words"}
        onChangeText={(value) => {
          props.setName(value);
        }}
      />
      <PrimaryInput
        placeholder={"Contact Email"}
        value={props.email}
        onChangeText={(value) => {
          props.setEmail(value);
        }}
      />

      <PrimaryInput
        placeholder={"Contact Phone Number"}
        value={props.phoneNumber}
        onChangeText={(value) => {
          props.setPhoneNumber(value);
        }}
      />

      <PrimaryButton title={"Save Contact"} onPress={props.onSave} icon={{ name: "save", color: "white" }} />
    </View>
  );
}
