import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default MonitorsService = {
  async createMonitor(monitor) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/usermonitors`;

    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(monitor),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });
    const json = await response.json();

    if (response.status != 200) {
      console.error("MonitorsService.createMonitor",json);
      throw new Error(json.message ? json.message : "Unable to create monitor");
    }

    return json;
  },
  async triggerMonitorPanic(monitor) {
    console.log("triggering monitor panic");
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/usermonitors/panic`;

    const response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(monitor),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("MonitorsService.triggerMonitorPanic",json);
      throw new Error(json.message ? json.message : "Unable to create monitor");
    }

    console.log("triggerMonitorPanic",json);

    return json;
  },
  async updateMonitor(monitor) {
    console.log("updating monitor");
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/usermonitors/${monitor.id}`;
    const response = await fetch(serverUrl, {
      method: "PUT",
      body: JSON.stringify(monitor),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.error("MonitorsService.updateMonitor",json);
      throw new Error(json.message ? json.message : "Unable to update monitor");
    }

    return json;
  },
  async getMonitors() {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();

    const serverUrl = `${environment.serverUrl}/api/v1/usermonitors`;
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

  async getActiveMonitor() {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();

    const serverUrl = `${environment.serverUrl}/api/v1/usermonitors/active`;
    const response = await fetch(serverUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    if (response.ok) {
      const text = await response.text();
      if (text.length > 0) {
        const data = JSON.parse(text);
        return data;
      } else {
        return {};
      }
    }

    const json = await response.json();
    if (response.status != 200 || response.status != 204) {
      throw new Error(
        json.message ? json.message : "Unable to get active monitor"
      );
    }
  },

  async deleteMonitor(monitor) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = `${environment.serverUrl}/api/v1/monitor/${monitor.id}`;

    const response = await fetch(serverUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticationCredentials.token}`,
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      throw new Error(json.message ? json.message : "Unable to delete monitor");
    }

    return json;
  },
};
