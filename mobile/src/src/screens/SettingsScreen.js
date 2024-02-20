import React, { useEffect, useState } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Colors } from "../constants";
import * as Icon from "@expo/vector-icons";
import HamburgerMenuIcon from "../components/HamburgerMenuItem";
import SettingsService from "../services/SettingsService";
import DeleteMyAccountModal from "../components/DeleteMyAccountModal";
import {
  View,
  ScrollView,
  PrimaryButton,
  FullScreenLoadingComponent,
  PrimaryInput,
  Text,
} from "../components";
import Lib from "../utilities/Lib";
import DropdownComponent from "../components/DropdownComponent";

export default function SettingsScreen({ navigation }) {
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState(false);
  const [defaultMonitorTime, setDefaultMonitorTime] = useState("0");
  const [
    defaultMonitorTimeRemainingReminder,
    setDefaultMonitorTimeRemainingReminder,
  ] = useState("0");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerMenuIcon />,
    });
  });

  useEffect(() => {
    (async () => {
      console.log("SettingsScreen useEffect");
      await _getSettingsAsync();
    })();
  }, []);

  const _onSettingsChangeAsync = async () => {
    try {
      setLoading(true);

      const newSettings = {
        ...settings,
        defaultMonitorTime: parseInt(defaultMonitorTime),
        defaultMonitorTimeRemainingReminder: parseInt(
          defaultMonitorTimeRemainingReminder
        ),
      };

      await SettingsService.updateSettings(newSettings);
    } catch (error) {
      Lib.showError(error);
    }
    finally { 
      setLoading(false);
    }
  };

  const _getSettingsAsync = async () => {
    try {
      setLoading(true);

      const settings = await SettingsService.getSettings();
      setDefaultMonitorTimeRemainingReminder(
        `${settings.defaultMonitorTimeRemainingReminder}`
      );
      setDefaultMonitorTime(`${settings.defaultMonitorTime}`);

      setSettings(settings);
      console.log(settings);
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  const _onClickDeleteMyAccountModal = () => {
    Alert.alert(
      "Delete confimation",
      "Are you sure you want to delete your account? This action is permanent and can not be reversed!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: () => {
            setIsDeleteAccountModalVisible(true);
          },
        },
      ]
    );
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.box, styles.body]}>
        <DropdownComponent
          label={"Default Monitor Time Remaining Reminder"}
          placeholder="Select default monitor time"
          setValue={setDefaultMonitorTime}
          onChange={async() => {
            await _onSettingsChangeAsync();
          }}
          value={defaultMonitorTime}
          data={[
            { label: "30 min", value: "30" },
            { label: "1 hour", value: "60" },
            { label: "1.5 hours", value: "90" },
            { label: "2 hours", value: "120" },
          ]}
        />
      </View>
      <View style={[styles.box, styles.footer]}>
        <PrimaryButton
          title="Delete My Account"
          icon={{ name: "trash", color: "white" }}
          colorOverride={Colors.constants.danger}
          onPress={_onClickDeleteMyAccountModal}
        />
        <DeleteMyAccountModal
          visible={isDeleteAccountModalVisible}
          onBackdropPress={() => {
            setIsDeleteAccountModalVisible(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
  },
  box: {
    flex: 1,
  },
  body: {
    flex: 6,
  },
  footer: {
    flex: 1,
  },
});
