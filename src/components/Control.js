import React, { Component } from "react";

const Control = ({ handler, style }) => {
  const classes = "control " + style;
  const text = style.toUpperCase();
  return (
    <button className={classes} onClick={handler}>
      {text}
    </button>
  );
};

export default Control;
