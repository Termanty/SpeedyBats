import { Component } from "react";
import GameOver from "./components/GameOver";
import SpeedButtons from "./components/SpeedButtons";
import Controls from "./components/Controls";
import Stats from "./components/Stats";
import bg from "./bg.mp3";
import { db } from "./firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

let gameRunnigSound = new Audio(bg);

class App extends Component {
  state = {
    running: false,
    clickcount: 0,
    moves: [],
    active: [false, false, false, false],
    showPopUp: false,
    results: [],
    name: "",
  };

  clickID = null;
  resultsCollectionRef = collection(db, "results");

  gameOver = () => {
    if (this.clickID) clearTimeout(this.clickID);
    gameRunnigSound.pause();
    this.setState({ running: false, showPopUp: "showGameOver" });
  };

  resetGame = () => {
    if (this.clickID) clearTimeout(this.clickID);
    this.setState({
      running: false,
      clickcount: 0,
      moves: [],
      showPopUp: false,
    });
  };

  setActive = (btn, activity) => {
    const newArray = this.state.active.slice();
    newArray[btn] = activity;
    return newArray;
  };

  run = (delay, prevBtn = 0) => {
    if (!this.state.running) return;

    let btn;
    do {
      btn = Math.floor(Math.random() * 4);
    } while (btn === prevBtn);
    this.setState({
      moves: this.state.moves.concat([btn]),
      active: this.setActive(btn, true),
    });

    delay = delay * 0.97;
    setTimeout(
      () => this.setState({ active: this.setActive(btn, false) }),
      delay * 1.8
    );
    setTimeout(() => {
      this.run(delay, btn);
    }, delay);
  };

  startHandler = () => {
    if (this.state.running) return;
    this.setState({ running: true });
    gameRunnigSound.currentTime = 0;
    this.clickID = setTimeout(() => {
      this.gameOver();
    }, 4000);
    setTimeout(() => {
      gameRunnigSound.play();
      this.run(1000);
    }, 500);
  };

  stopHandler = () => {
    gameRunnigSound.pause();
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

  continueBtnHandler = () => {
    if (this.state.showPopUp === "showGameOver") {
      this.setState({
        showPopUp: "showStats",
      });
      return;
    }
    this.resetGame();
  };

  componentDidMount() {
    this.getResultsFromDB();
  }

  getResultsFromDB = async () => {
    const data = await getDocs(this.resultsCollectionRef);
    this.setState({
      results: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  };

  addResultToDB = async () => {
    await addDoc(this.resultsCollectionRef, {
      name: this.state.name,
      score: this.state.clickcount * 10,
      date: Timestamp.fromDate(new Date()),
    });
    this.getResultsFromDB();
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.addResultToDB();
    this.continueBtnHandler();
  };

  onChange = (e) => this.setState({ name: e.target.value });

  render() {
    const score = this.state.clickcount * 10;
    return (
      <div className="App">
        <h1>Speed Game</h1>
        <h2>Your score is: {score}</h2>
        <SpeedButtons handler={this.clickHandler} active={this.state.active} />
        <Controls
          startHandler={this.startHandler}
          stopHandler={this.stopHandler}
          running={this.state.running}
        />

        {this.state.showPopUp && (
          <>
            <div className="overlay1"></div>
            <div className="overlay2"></div>
          </>
        )}
        {this.state.showPopUp === "showGameOver" && (
          <GameOver
            handler={this.continueBtnHandler}
            score={score}
            results={this.state.results}
            submit={this.onSubmitHandler}
            name={this.state.name}
            change={this.onChange}
          />
        )}
        {this.state.showPopUp === "showStats" && (
          <Stats
            handler={this.continueBtnHandler}
            score={score}
            results={this.state.results}
          />
        )}
      </div>
    );
  }
}

export default App;
