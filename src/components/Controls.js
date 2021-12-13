import React from "react";
import Control from "./Control";

const Controls = ({ startHandler, stopHandler, running }) => {
  return (
    <div className="controls">
      <Control
        handler={startHandler}
        btnType="start"
        hide={running ? true : false}
      />
      <Control
        handler={stopHandler}
        btnType="stop"
        hide={running ? false : true}
      />
    </div>
  );
};

export default Controls;
