import React from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";
import PrimaryButton from "./PrimaryButton";

export default function AddContactModal(props) {
  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => {
        props.onBackdropPress(false);
      }}
    >
      <Dialog.Title title={"Add New Contact"} />
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>
        You can either add a new contact manually, or import a contact from your
        phones contact list.
      </Text>

      <Dialog.Actions>
        <PrimaryButton
          title={"Add A New Contact Manually"}
          style={{ marginBottom: 5 }}
          onPress={props.onAddNewContactManuallyPress}
        />
        <PrimaryButton
          title={"Import From Your Contact List"}
          style={{ marginBottom: 15 }}
          onPress={props.onImportFromContactListPress}
        />
      </Dialog.Actions>
    </Dialog>
  );
}
