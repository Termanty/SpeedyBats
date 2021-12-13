import React from "react";

const GameOver = ({ handler, score, results }) => {
  function allTimeList() {
    const ranking = results.sort((a, b) => b.score - a.score).slice(0, 7);
    return ranking.map((stat, rank) => (
      <tr key={stat.id}>
        <td>{rank + 1}</td>
        <td>{stat.name}</td>
        <td>{stat.score}</td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="overlay"></div>
      <div className="game-over">
        <h2 className="game-over-h2 stats">BEST SCORES</h2>
        <table>
          <thead>
            <tr>
              <th>Ranking</th>
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
