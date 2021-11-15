import React from "react";

const GameOver = ({ handler, score }) => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="game-over">
        <button className="close" onClick={handler}>
          X
        </button>
        <h2>GAME OVER</h2>
        <p>Your score was: {score}</p>
      </div>
    </div>
  );
};

export default GameOver;
