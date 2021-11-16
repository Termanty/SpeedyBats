import React from "react";

const GameOver = ({ handler, score, results, submit, name, change }) => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="game-over">
        <h2>GAME OVER</h2>
        <p>Your score was: {score}</p>
        <form onSubmit={submit}>
          <label htmlFor="name">Your nickname </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={change}
            value={name}
          />
          <input type="submit" value="save" />
        </form>

        <button className="continue" onClick={handler}>
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default GameOver;
