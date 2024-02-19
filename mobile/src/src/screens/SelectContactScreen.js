import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import { FullScreenLoadingComponent, ScrollView } from "../components";
import Colors from "../constants/Colors";
import { Alert, TouchableOpacity, Text } from "react-native";
import Lib from "../utilities/Lib";
import ContactsService from "../services/ContactsService";

export default function SelectContactScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const _getContactPhoneNumber = (contact) => {
    return contact != null &&
      contact.phoneNumbers != null &&
      contact.phoneNumbers.length > 0 &&
      contact.phoneNumbers[0] != null &&
      contact.phoneNumbers[0].digits != null
      ? contact.phoneNumbers[0].digits
      : "";
  };

  const _getContactEmail = (contact) => {
    return contact != null &&
      contact.emails != null &&
      contact.emails.length > 0 &&
      contact.emails[0] != null &&
      contact.emails[0].email != null
      ? contact.emails[0].email
      : "";
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        let contactList = [];

        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            const contact = data[i];
            contactList.push({
              id: Lib.generateGuid(),
              name: contact.name != null ? contact.name : "No name",
              phoneNumber: _getContactPhoneNumber(contact),
              email: _getContactEmail(contact),
              checked: false,
            });
          }
          setContacts(Lib.sortContactList(contactList));
        }
      } else {
        Alert.alert(
          "Unable to import",
          "Unable to import contacts, please add a new contact manually",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      }
      setLoading(false);
    })();
  }, []);

  const _onContactPress = (contact) => {
    let filtered = contacts.filter((arr) => arr.id != contact.id);
    filtered.push({ ...contact, checked: !contact.checked });
    setContacts(Lib.sortContactList(filtered));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={_addSelectedContactsAsync}
          disabled={!contacts.find((contact) => contact.checked)}>
          {!contacts.find((contact) => contact.checked) ? (
            <></>
          ) : (
            <Text
              style={{
                fontSize: 18,
                color: !contacts.find((contact) => contact.checked)
                  ? Colors.constants.lightGrey
                  : Colors.constants.white,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          )}
        </TouchableOpacity>
      ),
    });
  });

  const _addSelectedContactsAsync = async () => {
    try {
      setLoading(true);
      const contactsToAdd = contacts.filter((contact) => contact.checked);
      await ContactsService.createContacts(contactsToAdd);

      navigation.goBack();
      return;
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenLoadingComponent text={'Loading...'} />;
  }

  return (
    <ScrollView>
      {!!contacts &&
        contacts.length > 0 &&
        contacts.map((contact, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                _onContactPress(contact);
              }}
            >
              <ListItem bottomDivider>
                <ListItem.CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={contact.checked}
                  onPress={() => {
                    _onContactPress(contact);
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {contact.name}
                  </ListItem.Title>
                  <ListItem.Subtitle>{contact.phoneNumber}</ListItem.Subtitle>
                  <ListItem.Subtitle>{contact.email}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}
