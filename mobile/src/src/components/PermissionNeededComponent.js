import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Linking } from "react-native";
import { Colors } from "../constants";
import { ScrollView } from "./Themed";
import PrimaryButton from "./PrimaryButton";

const PermissionNeededComponent = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Permissions Needed</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.descriptionText}>
            Duenna requires location permissions primarily to fulfill its core
            functionality of enhancing personal safety through features like
            Instant Alert Systems, Timed Check-Ins, and Live Location Tracking.
          </Text>

          <Text style={styles.descriptionText}>
            Please provide Duenna with the required permissions to ensure that
            you can use all of its features.
          </Text>

          <Image
            source={require("../../assets/images/required_permissions.jpg")}
            style={styles.logo}
          />

          <PrimaryButton
            title={"Open Settings"}
            style={{ marginTop: 10 }}
            onPress={() => {
              Linking.openSettings();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: "#fff", 
  },
  header: {
    height: 60, 
    backgroundColor: "#fff", 
    alignItems: "center",
    justifyContent: "center", 
  },
  headerText: {
    color: Colors.constants.darkGrey,
    fontSize: 20,
    fontWeight: "bold", 
  },
  content: {
    flex: 1, 
    alignItems: "center", 
    textAlign: "center",
    margin: 10,
    justifyContent: "center", 
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    color: Colors.constants.darkGrey,
  },
  logo: {
    borderColor: Colors.constants.lightGrey,
    borderWidth: 3,
    borderRadius: 2,
    marginTop: 10,
    width: 300,
    height: 382,
  },
});

export default PermissionNeededComponent;
