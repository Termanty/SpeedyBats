import React from "react";

const Button = ({ handler, active, btn }) => {
  const classes = "speed-button " + (active[btn] ? "glow" : "");
  console.log("button: " + btn + ", style: " + classes);
  return <button className={classes} onClick={() => handler(btn)}></button>;
};

export default Button;
