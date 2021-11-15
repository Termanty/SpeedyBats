import React from "react";
import Button from "./Button";

const SpeedButtons = ({ handler, style }) => {
  return (
    <div className="speed-buttons">
      <Button handler={handler} style={style} btn={1} />
      <Button handler={handler} style={style} btn={2} />
      <Button handler={handler} style={style} btn={3} />
      <Button handler={handler} style={style} btn={4} />
    </div>
  );
};

export default SpeedButtons;
