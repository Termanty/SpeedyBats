import React from "react";

const Control = ({ handler, btnType }) => {
  const classes = "control " + btnType;
  const text = btnType.toUpperCase();
  return (
    <button className={classes} onClick={handler}>
      {text}
    </button>
  );
};

export default Control;
