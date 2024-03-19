import React from "react";
import { UserContext } from "@mf/user-context";

const useUserContext = () => React.useContext(UserContext);

export function SayHello(props) {
  const [count, setCount] = React.useState(0);
  const { user } = useUserContext();

  return (
    <div style={{ backgroundImage: "linear-gradient(to right, red , yellow)" }}>
      <h1>Remote {props.name}</h1>
      <h4>ctx: {user.name}</h4>
      <button onClick={() => setCount((n) => n + 1)}>increment</button>
      <br />
      <div>count: {count} </div>
    </div>
  );
}
