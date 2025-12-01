import { createContext } from "react";

export const UserContext = createContext({
  userMetadata: () => {},
  username: null,
  isUserLoggedIn: false,
});
