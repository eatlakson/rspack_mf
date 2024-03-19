import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { UserContext } from "@mf/user-context";

function UserProvider({ children }) {
  const user = { name: "Test UserName" };
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
