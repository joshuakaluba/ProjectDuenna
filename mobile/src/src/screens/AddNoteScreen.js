import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  PrimaryInput,
  FullScreenLoadingComponent,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { MonitoringContext } from "../hooks";
import NotesService from "../services/NotesService";
import { Colors } from "../constants";
import * as Icon from "@expo/vector-icons";

export default function AddNoteScreen() {
  const navigation = useNavigation();

  const { monitor } = useContext(MonitoringContext);

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={_onNoteSaveClickAsync}
          disabled={note.length < 4}
        >
          <Icon.FontAwesome5 name={"save"} size={30} color={Colors.constants.white} />
        </TouchableOpacity>
      ),
    });
  });

  const _onNoteSaveClickAsync = async () => {
    setLoading(true);

    try {
      const noteToSave = {
        textContext: note.trim(),
        userMonitorId: monitor.id,
      };
      await NotesService.createNote(noteToSave);

      navigation.goBack();
      return;
    } catch (error) {
      console.error("AddNoteScreen._onNoteSaveClickAsync", error);
    }

    setLoading(false);
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.box, styles.body]}>
        <Text
          style={{
            fontSize: 16,
            paddingTop: 10,
            paddingBottom: 65,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add relevant notes that would be helpful to your contacts should
          something go unplanned.
        </Text>

        <PrimaryInput
          placeholder="Notes"
          multiline={true}
          value={note}
          onChangeText={(value) => {
            setNote(value);
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
