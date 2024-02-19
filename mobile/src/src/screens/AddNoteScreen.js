import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import {
  PrimaryButton,
  View,
  Text,
  PrimaryInput,
  FullScreenLoadingComponent,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { MonitoringContext } from "../hooks";
import NotesService from "../services/NotesService";

export default function AddNoteScreen() {
  const navigation = useNavigation();

  const { monitor } = useContext(MonitoringContext);

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

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
      <Text
        style={{
          fontSize: 16,
          paddingBottom: 15,
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

      <PrimaryButton
        disabled={note.length < 4}
        onPress={_onNoteSaveClickAsync}
        icon={{ name: "save", color: "white" }}
        title="Save Note"
      ></PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 20,
    paddingRight: 5,
    paddingBottom: 5,
  },
});
