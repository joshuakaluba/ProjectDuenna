import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default ContactsService = {
  async createContacts(listOfContacts) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/contacts`;
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(listOfContacts),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("ContactService.createContacts", json);
      throw new Error(
        json.message ? json.message : "Unable to create contacts"
      );
    }

    return json;
  },
  async updateContact(contact) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/contacts/${contact.id}`;
    const response = await fetch(serverUrl, {
      method: "PUT",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("ContactsService.editContacts",json);
      throw new Error(json.message ? json.message : "Unable to edit contacts");
    }

    return json;
  },
  async getContacts() {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();

    const serverUrl = `${environment.serverUrl}/api/v1/contacts`;
    const response = await fetch(serverUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("ContactsService.getContacts",json);
      throw new Error(json.message ? json.message : "Unable to get contacts");
    }

    return json;
  },
  async deleteContact(contact) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/contacts/${contact.id}`;

    const response = await fetch(serverUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(json.message ? json.message : "Unable to delete contact");
    }

    return json;
  },
};
