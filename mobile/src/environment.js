import config from "./config.json";
import * as Application from 'expo-application';

export default environment = {
  appTitle: config.appTitle,

  serverUrl:'https://api.duenna.net',
  versionKey:`${Application.nativeApplicationVersion}-0`
};
