import React from "react";
import { UserContext } from "@mf/user-context";

const useUserContext = () => React.useContext(UserContext);

export function SayHello(props) {
  const [count, setCount] = React.useState(0);
  const { user } = useUserContext();

  return (
    <div style={{ backgroundImage: "linear-gradient(to right, red , yellow)" }}>
      <h1>Hello from the Remote! {props.name}</h1>
      <div>ctx: {user.name}</div>
      <button onClick={() => setCount((n) => n + 1)}>increment</button>
      <br />
      <div>count: {count} </div>
    </div>
  );
}
