import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default SettingsService = {

  async updateSettings(settings) {
    console.log("updating settings");
    const authenticationCredentials = await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/settings/${settings.id}`;
    const response = await fetch(serverUrl, {
      method: "PUT",
      body: JSON.stringify(settings),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("SettingsService.updateSettings",json);
      throw new Error(json.message ? json.message : "Unable to update settings");
    }

    return json;
  },
  async getSettings() {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();

    const serverUrl = `${environment.serverUrl}/api/v1/settings`;
    const response = await fetch(serverUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error(json);
      throw new Error("MonitorsService.getMonitors",json.message ? json.message : "Unable to get monitors");
    }

    return json;
  },
};
