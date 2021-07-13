import React from "react";
import useHover from "../hooks/useHover";

export default function Hover() {
  const ref = React.useRef();

  const isHovering = useHover(ref);
  console.log(isHovering);
  return (
    <div
      ref={ref}
      style={{
        width: 300,
        height: 300,
        background: isHovering ? "red" : "blue",
      }}
    ></div>
  );
}
