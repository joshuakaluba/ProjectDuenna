import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default NotesService = {
  async createNote(note) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/notes`;
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
        console.log(location);
      console.error("NotesService.createNote",json);

      throw new Error(
        json.message ? json.message : "Unable to create note"
      );
    }

    return json;
  },

};
