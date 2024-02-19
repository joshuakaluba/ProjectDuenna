import environment from "../../environment";
import StorageHelper from "../utilities/StorageHelper";

export default AuthenticationService = {
  async register(credentials) {
    const serverUrl = environment.serverUrl;
    const response = await fetch(
      serverUrl + "/api/v1/authentication/register",
      {
        method: "post",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      console.error("Authentication service ", json);
      throw new Error(json.message ? json.message : "Unable to register");
    }

    return json;
  },
  async login(credentials) {
    const serverUrl = environment.serverUrl;
    const response = await fetch(serverUrl + "/api/v1/authentication/login", {
      method: "post",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.status != 200) {
      console.log(json);
      throw new Error(json.message ? json.message : "Unable to login");
    }

    return json;
  },

  async delete(credentials) {
    const authenticationCredentials =
      await StorageHelper.getAuthenticationCredentials();
    const serverUrl = environment.serverUrl;
    const response = await fetch(
      serverUrl + "/api/v1/authentication/deletemyaccount",
      {
        method: "post",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticationCredentials.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.status != 200) {
      console.log(json);
      throw new Error(
        json.message ? json.message : "Unable to delete my account"
      );
    }

    return json;
  },
};
