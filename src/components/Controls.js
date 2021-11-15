import React, { Component } from "react";
import Control from "./Control";

const Controls = ({ startHandler, stopHandler }) => {
  return (
    <div className="controls">
      <Control handler={startHandler} style="start" />
      <Control handler={stopHandler} style="stop" />
    </div>
  );
};

export default Controls;
