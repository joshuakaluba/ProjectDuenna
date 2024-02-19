import * as React from "react";
import { useState, useEffect } from "react";
import ContactModificationForm from "../components/ContactModificationForm";
import { FullScreenLoadingComponent, View } from "../components";
import Lib from "../utilities/Lib";
import ContactsService from "../services/ContactsService";

export default function EditContactScreen({ navigation, route }) {
  const { contact } = route.params;
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setId(contact.id);
    setEmail(contact.email);
    setName(contact.name);
    setPhoneNumber(contact.phoneNumber);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Edit ${contact.name}`,
    });
  }, [navigation]);

  const _onSavePressAsync = async () => {
    setLoading(true);
    try {
      await ContactsService.updateContact({
        id,
        name,
        email,
        phoneNumber,
      });
      navigation.goBack();
    } catch (error) {
      Lib.show(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenLoadingComponent text="Loading" />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ContactModificationForm
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onSave={_onSavePressAsync}
      />
    </View>
  );
}
