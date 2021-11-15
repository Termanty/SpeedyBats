import React from "react";

const Button = ({ handler, style, btn }) => {
  const classes = `speed-button btn-${btn} ${style[btn]}`;
  return <button className={classes} onClick={() => handler(btn)}></button>;
};

export default Button;
