import { createContext } from "react";

export const UserContext = createContext({
  user: {
    name: "User Name",
  },
});
