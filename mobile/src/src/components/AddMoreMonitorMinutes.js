import React from "react";
import { Dialog } from "@rneui/themed";
import PrimaryButton from "./PrimaryButton";
import DropdownComponent from "./DropdownComponent";

export default function AddMoreMonitorMinutes(props) {
  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => {
        props.onBackdropPress(false);
      }}
    >
      <Dialog.Title title={"Add More Time"} />

      <DropdownComponent
        label={"Select the amount of time to add to this monitor"}
        placeholder="Select the amount of time to add"
        setValue={props.setMinutes}
        value={props.minutes}
        data={[
          { label: "15 min", value: "15" },
          { label: "30 min", value: "30" },
          { label: "1 hour", value: "60" },
          { label: "1.5 hours", value: "90" },
          { label: "2 hours", value: "120" },
        ]}
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
