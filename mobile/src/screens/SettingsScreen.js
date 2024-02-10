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
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
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

              alert("Your settings have been saved!");
            } catch (error) {
              Lib.showError(error);
            }
            setLoading(false);
          }}
        >
          <Icon.Entypo name={"save"} size={30} color={Colors.constants.white} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    (async () => {
      console.log("SettingsScreen useEffect");
      await _getSettingsAsync();
    })();
  }, []);

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
        <ScrollView>
          <Text style={{ textAlign: "center" }}>
            Default Monitor Duration (minutes)
          </Text>
          <PrimaryInput
            placeholder="Default Monitor Duration (minutes)"
            value={defaultMonitorTime}
            keyboardType="numeric"
            onChangeText={(value) => {
              setDefaultMonitorTime(value);
            }}
          />
          <Text style={{ textAlign: "center" }}>
            Default Monitor Time Remaining Reminder(minutes)
          </Text>
          <PrimaryInput
            placeholder="Default Monitor Time Remaining Reminder(minutes)"
            value={defaultMonitorTimeRemainingReminder}
            keyboardType="numeric"
            onChangeText={(value) => {
              setDefaultMonitorTimeRemainingReminder(value);
            }}
          />
          <PrimaryButton
            title="Delete My Account"
            icon={{ name: "trash", color: "white" }}
            colorOverride={Colors.constants.danger}
            onPress={_onClickDeleteMyAccountModal}
          />
        </ScrollView>
      </View>
      <View style={[styles.box, styles.footer]}>
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
