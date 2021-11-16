import React from "react";
import Control from "./Control";

const Controls = ({ startHandler, stopHandler }) => {
  return (
    <div className="controls">
      <Control handler={startHandler} btnType="start" />
      <Control handler={stopHandler} btnType="stop" />
    </div>
  );
};

export default Controls;
