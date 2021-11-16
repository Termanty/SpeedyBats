import React from "react";

const GameOver = ({ handler, score, results }) => {
  function allTimeList() {
    return results.map((stat) => (
      <tr key={stat.id}>
        <td>{stat.name}</td>
        <td>{stat.score}</td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="overlay"></div>
      <div className="game-over">
        <h2>BEST SCORES</h2>
        <p>Your score was: {score}</p>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{allTimeList()}</tbody>
        </table>
        <button className="continue" onClick={handler}>
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default GameOver;
