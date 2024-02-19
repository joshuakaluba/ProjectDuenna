import { createContext } from "react";

const AuthenticationContext = createContext({
  isSignedIn: false,
  setIsSignedIn: (auth) => {},
});

export default AuthenticationContext;
