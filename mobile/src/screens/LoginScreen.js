import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import {
  PrimaryButton,
  View,
  PrimaryInput,
  FullScreenLoadingComponent,
} from "../components";
import validator from "validator";
import AuthenticationService from "../services/AuthenticationService";
import { AuthenticationContext } from "../hooks";
import StorageHelper from "../utilities/StorageHelper";
import Lib from "../utilities/Lib";

export default function LoginScreen() {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _onLoginClickAsync = async () => {
    setLoading(true);
    try {
      const authResult = await AuthenticationService.login({
        email: email,
        password: password,
      });

      await StorageHelper.saveAuthenticationToken(authResult);
      setIsSignedIn(true);
    } catch (error) {
      console.error("Login screen", error);
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

      <PrimaryButton
        disabled={
          password.length < 4 || email.length < 3 || !validator.isEmail(email)
        }
        onPress={_onLoginClickAsync}
        icon={{ name: "door-open", color: "white" }}
        title="Login"
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
