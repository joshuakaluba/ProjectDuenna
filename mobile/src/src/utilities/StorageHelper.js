import * as SecureStore from "expo-secure-store";

const TOKEN_STORAGE_KEY = "TOKEN_STORAGE_KEY";
const PUSH_NOTIFICATION_KEY = "PUSH_NOTIFICATION_KEY";

export default StorageHelper = {
  async getAuthenticationCredentials() {
    const user = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
    return JSON.parse(user);
  },

  async saveAuthenticationToken(token) {
    await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, JSON.stringify(token));
  },

  async savePushNotificationToken(token) {
    await SecureStore.setItemAsync(PUSH_NOTIFICATION_KEY, token);
  },

  async getPushNotificationToken() {
    const token = await SecureStore.getItemAsync(PUSH_NOTIFICATION_KEY);
    return token;
  },

  async clear() {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
    await SecureStore.deleteItemAsync(PUSH_NOTIFICATION_KEY);
  }
};
