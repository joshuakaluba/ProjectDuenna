import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default LocationService = {
  async createMonitorLocation(location) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/monitorlocations`;
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
        console.log(location);
      console.error("LocationService.createMonitorLocation",json);

      throw new Error(
        json.message ? json.message : "Unable to send location"
      );
    }

    return json;
  },

};
