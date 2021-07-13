import React from "react";
import axios from "axios";
import useRequest from "../hooks/useRequest";

export default function List2() {
  const [todos, loading, error] = useRequest(fetchTodos);

  function fetchTodos() {
    return axios.get(`https://jsonplaceholder.typicode.com/todos`);
  }

  if (loading) {
    console.log("loading: ", loading);
    return <div className="">Loading...</div>;
  }

  if (error) {
    console.log("error: ");
    return <div className="">Error</div>;
  }

  return (
    <div>
      {todos &&
        todos.map((todo) => (
          <div
            key={todo.id}
            className="todo"
            style={{ padding: 30, border: "2px solid black" }}
          >
            {todo.id} {todo.title}
          </div>
        ))}
    </div>
  );
}
