import React, { useState } from "react";
import {FloatingCell} from './components/FloatingCell';
import {Pacman} from './components/Pacman';
import "./App.scss";

const UNIT = 35;
const map = `
######################
######################
##                  ##
##  ###  #########  ##
##  ###  #########  ##
##       ##   ####  ##
##  #######     ##  ##
##  #######     ##  ##
##  ##              ##
##  ##              ##
##         ######   ##
##         ######   ##
##         ######   ##
##    ##       ##   ##
##    ##       ##   ##
##             ##   ##
######################
######################
`
  .split("\n")
  .slice(1, -1)
  .map(line => line.split(""));

const border = (i, j) => {
  if (i < 0 || j < 0) return false;
  if (i >= map.length || j >= map[0].length) return false;
  return map[i][j] === "#";
};

const App = () => {
  const [pacman, setPacman] = useState({ i: 2, j: 2 });
  const cells = [];
  for (let i = 0; i < map.length - 0; i++) {
    for (let j = 0; j < map[i].length - 0; j++) {
      const style = {
        width: `${UNIT}px`,
        height: `${UNIT}px`
      };

      const borders = [];
      if (map[i][j] === "#") {
        const offset = [-1, 0, 1];
        const counts = [
          offset.map(c => !border(i - 1, j + c)).filter(i => i).length,
          offset.map(c => !border(i + c, j + 1)).filter(i => i).length,
          offset.map(c => !border(i + 1, j + c)).filter(i => i).length,
          offset.map(c => !border(i + c, j - 1)).filter(i => i).length
        ];
        const straights = counts.map(c => c > 1);
        if (straights.filter(i => i).length === 1) {
          const type = straights.indexOf(true) % 2 === 0 ? "h" : "v";
          borders.push(
            <div
              key={`cell-border-${i}-${j}`}
              className={`wall wall-${type}`}
            ></div>
          );
        } else if (straights.filter(i => i).length === 2) {
          let type = "";
          if (straights[0] && straights[1]) {
            type = "ur";
          } else if (straights[1] && straights[2]) {
            type = "rb";
          } else if (straights[2] && straights[3]) {
            type = "bl";
          } else if (straights[3] && straights[0]) {
            type = "lu";
          }
          borders.push(
            <div
              key={`cell-border-${i}-${j}`}
              className={`wall wall-${type}`}
            ></div>
          );
        } else {
          let type = "";
          if (counts[0] === 1 && counts[1] === 1) {
            type = "bl";
          } else if (counts[1] === 1 && counts[2] === 1) {
            type = "lu";
          } else if (counts[2] === 1 && counts[3] === 1) {
            type = "ur";
          } else if (counts[3] === 1 && counts[0] === 1) {
            type = "rb";
          }
          borders.push(
            <div
              key={`cell-border-${i}-${j}`}
              className={`wall wall-${type}`}
            ></div>
          );
        }
      }

      cells.push(
        <div key={`cell-${i}-${j}`} className="cell" style={style}>
          {borders}
        </div>
      );
    }
  }
  const style = {
    width: `${map[0].length * UNIT}px`,
    height: `${map.length * UNIT}px`
  };

  setTimeout(() => {
    setPacman({
      i: pacman.i,
      j: pacman.j + 1
    });
  }, 500);

  return (
    <div className="App" style={style}>
      {cells}
      <FloatingCell offsetTop={pacman.i} offsetLeft={pacman.j} unit={UNIT}>
        <Pacman direction="top"/>
      </FloatingCell>
    </div>
  );
};

export default App;
