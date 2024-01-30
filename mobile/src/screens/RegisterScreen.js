import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import validator from "validator";
import { CheckBox } from "@rneui/themed";
import {
  PrimaryButton,
  View,
  PrimaryInput,
  FullScreenLoadingComponent,
} from "../components";
import AuthenticationService from "../services/AuthenticationService";
import { AuthenticationContext } from "../hooks";
import StorageHelper from "../utilities/StorageHelper";
import Lib from "../utilities/Lib";

export default function RegisterScreen() {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const _onRegisterClickAsync = async () => {
    setLoading(true);
    try {
      const authResult = await AuthenticationService.register({
        email: email,
        password: password,
      });

      await StorageHelper.saveAuthenticationToken(authResult);
      setIsSignedIn(true);
      return;
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <View style={[styles.container]}>
      <PrimaryInput
        placeholder="Email"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />

      <PrimaryInput
        placeholder="Password"
        value={password}
        password={true}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />

      <PrimaryInput
        placeholder="Confirm Password"
        value={confirmPassword}
        password={true}
        onChangeText={(value) => {
          setConfirmPassword(value);
        }}
      />

      <CheckBox
        center
        title="I accept all terms and conditions"
        checked={acceptedTerms}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      />

      <PrimaryButton
        disabled={
          !validator.isEmail(email) ||
          password != confirmPassword ||
          !acceptedTerms ||
          password.length < 6
        }
        icon={{ name: "user-plus", color: "white" }}
        onPress={_onRegisterClickAsync}
        title="Register"
      ></PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
    paddingBottom: 5,
  },
});
