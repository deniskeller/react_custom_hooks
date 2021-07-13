import React from "react";
import useInput from "../hooks/useInput";

export default function Form() {
  const username = useInput("");
  const password = useInput("");

  return (
    <div>
      <div className="">
        <input {...username} type="text" name="username" placeholder="name" />
        <input
          {...password}
          type="text"
          name="password"
          placeholder="password"
        />
        <button onClick={() => console.log(username.value, password.value)}>
          click
        </button>
      </div>
    </div>
  );
}
