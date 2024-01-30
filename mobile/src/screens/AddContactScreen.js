import * as React from "react";
import { useState, useEffect } from "react";
import ContactModificationForm from "../components/ContactModificationForm";
import { FullScreenLoadingComponent, View } from "../components";
import Lib from "../utilities/Lib";
import ContactsService from "../services/ContactsService";

export default function AddContactScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: `Add New Contact`,
    });
  }, [navigation]);

  const _onSavePressAsync = async () => {
    setLoading(true);
    try {
      const contactInList = [
        {
          name,
          email,
          phoneNumber,
        },
      ];
      await ContactsService.createContacts(contactInList);
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
