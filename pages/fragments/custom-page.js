import React from "react";

export function CustomPage(props) {
  const { text } = props;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}