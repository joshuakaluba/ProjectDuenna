import React, { useState , useContext} from "react";
import { Text, Alert } from "react-native";
import { Dialog } from "@rneui/themed";
import { Colors } from "../constants";
import PrimaryButton from "./PrimaryButton";
import PrimaryInput from "./PrimaryInput";
import AuthenticationService from "../services/AuthenticationService";
import { AuthenticationContext } from "../hooks";
import StorageHelper from "../utilities/StorageHelper";
import Lib from "../utilities/Lib";

export default function DeleteMyAccountModal(props) {
  const [password, setPassword] = useState("");
  const { setIsSignedIn } = useContext(AuthenticationContext);

  const _deleteAccountAsync = async () => {
    try {
      await AuthenticationService.delete({ password: password });
      setIsSignedIn(false);
      await StorageHelper.clear();

    } catch (error) {
      Lib.showError(error);
    }
  };

  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => {
        props.onBackdropPress(false);
      }}
    >
      <Dialog.Title title={"Delete account"} />
      <Text style={{ fontSize: 16, paddingBottom: 5 }}>
        We hate to see you go.
      </Text>
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>
        To delete your account, please confirm your password to proceed.
      </Text>

      <PrimaryInput
        placeholder="Password"
        value={password}
        password={true}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />

      <Dialog.Actions>
        <PrimaryButton
          title="Delete My Account"
          disabled={password.length < 4}
          icon={{ name: "trash", color: "white" }}
          colorOverride={Colors.constants.danger}
          onPress={_deleteAccountAsync}
        />
      </Dialog.Actions>
    </Dialog>
  );
}
