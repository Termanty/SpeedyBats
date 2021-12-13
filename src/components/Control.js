import React from "react";

const Control = ({ handler, btnType, hide }) => {
  const classes = `control ${btnType} ${hide ? "hide" : ""}`;
  const text = btnType.toUpperCase();
  return (
    <button className={classes} onClick={hide ? () => void 0 : handler}>
      {text}
    </button>
  );
};

export default Control;
