import React from "react";
import Button from "./Button";

const SpeedButtons = ({ handler, active }) => {
  return (
    <div className="speed-buttons">
      <Button handler={handler} active={active} btn={0} />
      <Button handler={handler} active={active} btn={1} />
      <Button handler={handler} active={active} btn={2} />
      <Button handler={handler} active={active} btn={3} />
    </div>
  );
};

export default SpeedButtons;
