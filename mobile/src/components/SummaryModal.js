import React from "react";
import { Text } from "react-native";
import { Dialog } from "@rneui/themed";
import PrimaryButton from "./PrimaryButton";

export default function SummaryModal(props) {
  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => {
        props.onBackdropPress(false);
      }}
    >
      <Dialog.Title
        title={
          props.isMultipleChoice
            ? "Completed flash cards!"
            : "Practice test complete!"
        }
      />
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>{props.text}</Text>
      {props.unlocked && (
        <Text style={{ fontSize: 12, paddingBottom: 10 }}>
          All questions unlocked
        </Text>
      )}
      <Dialog.Actions>
        <PrimaryButton
          title={"Retry"}
          style={{ marginBottom: 5 }}
          onPress={props.onRetryPress}
        />
        <PrimaryButton
          title={"Summary"}
          style={{ marginBottom: 15 }}
          onPress={props.onSummaryPress}
        />
        {!props.unlocked ? (
          <PrimaryButton
            title={"Unlock More Questions!"}
            invert={true}
            onPress={props.onUnlockPress}
          />
        ) : (
          <></>
        )}
      </Dialog.Actions>
    </Dialog>
  );
}
