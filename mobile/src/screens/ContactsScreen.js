import * as React from "react";
import { useEffect, useState } from "react";
import * as Icon from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import AddContactModal from "../components/AddContactModal";
import HamburgerMenuIcon from "../components/HamburgerMenuItem";
import { View, Text, ScrollView } from "../components";
import { ListItem, Button } from "@rneui/themed";

import Colors from "../constants/Colors";
import Lib from "../utilities/Lib";
import { FullScreenLoadingComponent } from "../components";
import ContactsService from "../services/ContactsService";
import NoContactCard from "../components/NoContactCard";

export default function ContactsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerMenuIcon />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setAddContactModalVisible(true);
          }}
        >
          <Icon.Entypo name={"plus"} size={30} color={Colors.constants.white} />
        </TouchableOpacity>
      ),
    });
  });

  const _onImportContactAsync = async () => {
    setAddContactModalVisible(false);
    navigation.navigate("SelectContactScreen");
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        // You can await here
        await _getContactsAsync();
        // ...
      }

      fetchData();
    }, [])
  );

  useEffect(() => {
    (async () => {
      await _getContactsAsync();
    })();
  }, []);

  const _getContactsAsync = async () => {
    try {
      setLoading(true);
      const contacts = await ContactsService.getContacts();
      setContacts(contacts);
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  const _deleteContactAsync = async (contact) => {
    try {
        setLoading(true);
      await ContactsService.deleteContact(contact);
      await _getContactsAsync();
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  const _onPressDeleteContactAsync = async (contact) => {
    Alert.alert(
      "Perform Delete",
      `Are you sure you want to delete: ${contact.name}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await _deleteContactAsync(contact);
          },
        },
      ]
    );
  };

  const _onPressEditContact = (contact) => {
    navigation.navigate("EditContactScreen", { contact: contact });
  };

  const _onAddNewContactManuallyPress = () => {
    setAddContactModalVisible(false);
    navigation.navigate("AddContactScreen");
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  if (contacts === null || contacts.length <= 0) {
    return (
      <>
        <NoContactCard />
        <AddContactModal
          visible={addContactModalVisible}
          onImportFromContactListPress={_onImportContactAsync}
          onAddNewContactManuallyPress={_onAddNewContactManuallyPress}
          onBackdropPress={() => {
            setAddContactModalVisible(false);
          }}
        />
      </>
    );
  }

  return (
    <View styles={[styles.container]}>
      {!!contacts && contacts.length > 0 && (
        <ScrollView>
          {contacts.map((contact, i) => {
            return (
              <ListItem.Swipeable
                key={i}
                leftWidth={80}
                rightWidth={90}
                bottomDivider={true}
                minSlideWidth={40}
                leftContent={(action) => (
                  <Button
                    containerStyle={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: Colors.constants.blue,
                    }}
                    type="clear"
                    icon={{
                      name: "edit",
                      type: "font-awesome-5",
                    }}
                    onPress={() => {
                      _onPressEditContact(contact);
                    }}
                  />
                )}
                rightContent={(action) => (
                  <Button
                    containerStyle={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: Colors.constants.danger,
                    }}
                    onPress={() => {
                      _onPressDeleteContactAsync(contact);
                    }}
                    type="clear"
                    icon={{ name: "trash-alt", type: "font-awesome-5" }}
                  />
                )}
              >
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {contact.name}
                  </ListItem.Title>
                  <ListItem.Subtitle>{contact.phoneNumber}</ListItem.Subtitle>
                  <ListItem.Subtitle>{contact.email}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem.Swipeable>
            );
          })}
        </ScrollView>
      )}
      <AddContactModal
        visible={addContactModalVisible}
        onImportFromContactListPress={_onImportContactAsync}
        onAddNewContactManuallyPress={_onAddNewContactManuallyPress}
        onBackdropPress={() => {
          setAddContactModalVisible(false);
        }}
      />
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
    flex: 8,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
