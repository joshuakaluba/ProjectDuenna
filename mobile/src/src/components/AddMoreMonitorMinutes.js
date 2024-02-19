import React, { useState, useContext } from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";
import PrimaryButton from "./PrimaryButton";
import PrimaryInput from "./PrimaryInput";

export default function AddMoreMonitorMinutes(props) {

  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => {
        props.onBackdropPress(false);
      }}
    >
      <Dialog.Title title={"Add More Time"} />
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>
        Add more time to your current monitor
      </Text>
      <Text style={{ fontSize: 16, paddingBottom: 10, fontWeight: "bold" }}>
        Please enter the number of minutes you would like to add to this monitor
      </Text>

      <PrimaryInput
        placeholder="Notes"
        value={props.minutes}
        onChangeText={(value) => {
          props.setMinutes(value);
        }}
      />

      <Dialog.Actions>
        <PrimaryButton
          title={"Update Monitor"}
          icon={{ name: "save", color: "white" }}
          style={{ marginBottom: 5 }}
          onPress={props.onUpdateMonitor}
        />
      </Dialog.Actions>
    </Dialog>
  );
}
