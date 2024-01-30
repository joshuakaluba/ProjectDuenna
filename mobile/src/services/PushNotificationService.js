import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default PushNotificationService = {
  async createPushNotification(token) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/pushnotifications`;
    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(token),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("PushNotificationService.createPushNotification", json);
      throw new Error(
        json.message ? json.message : "Unable to create push notification"
      );
    }

    return json;
  },
};
