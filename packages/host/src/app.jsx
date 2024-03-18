import React, { useContext } from "react";
import { SayHello } from "@mf/remote";
import { UserContext } from "@mf/user-context";

const useUserContext = () => useContext(UserContext);

export default function HostApp() {
  const { user } = useUserContext();
  return (
    <>
      <h1>{"HOST"}</h1>
      <div>ctx: {user.name}</div>
      <div style={{ border: "1px solid blue" }}>
        <SayHello />
      </div>
    </>
  );
}
