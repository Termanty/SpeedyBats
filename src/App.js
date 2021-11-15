import { Component } from "react";
import GameOver from "./components/GameOver";
import SpeedButtons from "./components/SpeedButtons";
import Controls from "./components/Controls";

class App extends Component {
  state = {
    running: false,
    clickcount: 0,
    moves: [],
    1: "",
    2: "",
    3: "",
    4: "",
    showGameOver: false,
  };

  clickID = null;

  gameOver = () => {
    if (this.clickID) clearTimeout(this.clickID);
    this.setState({ running: false, showGameOver: "show" });
  };

  resetGame = () => {
    if (this.clickID) clearTimeout(this.clickID);
    this.setState({
      running: false,
      clickcount: 0,
      moves: [],
      showGameOver: false,
    });
  };

  removeColor = (btn) => {
    this.setState({ [btn]: "" });
  };

  clearGlowFromButton = (btn) => {
    return () => this.setState({ [btn]: "" });
  };

  run = (delay, prevBtn = 0) => {
    if (!this.state.running) return;
    let btn;
    do {
      btn = Math.ceil(Math.random() * 4);
    } while (btn === prevBtn);

    this.setState({
      moves: this.state.moves.concat([btn]),
      [btn]: "glow-" + btn,
    });
    delay = delay * 0.9;
    setTimeout(this.clearGlowFromButton(btn), delay * 1.8);
    setTimeout(() => {
      this.run(delay, btn);
    }, 1000);
  };

  startHandler = () => {
    if (this.state.running) return;
    console.log("Game starting");
    this.setState({ running: true });
    this.clickID = setTimeout(() => {
      this.gameOver();
    }, 4000);
    setTimeout(() => {
      this.run(1000);
    }, 1000);
  };

  stopHandler = () => {
    this.resetGame();
  };

  clickHandler = (n) => {
    if (!this.state.running) return;
    const clicks = this.state.clickcount;
    if (this.state.moves[clicks] !== n) {
      this.gameOver();
      return;
    }
    clearTimeout(this.clickID);
    this.clickID = setTimeout(() => {
      this.gameOver();
    }, 4000);
    this.setState({ clickcount: clicks + 1 });
  };

  closeBtnHandler = () => {
    console.log("close button");
    this.resetGame();
  };

  render() {
    const score = this.state.clickcount * 10;

    return (
      <div className="App">
        <h1>Speed Game</h1>
        <h2>Your score is: {score}</h2>
        <SpeedButtons handler={this.clickHandler} style={this.state} />
        <Controls
          startHandler={this.startHandler}
          stopHandler={this.stopHandler}
        />
        {this.state.showGameOver && (
          <GameOver handler={this.closeBtnHandler} score={score} />
        )}
      </div>
    );
  }
}

export default App;
