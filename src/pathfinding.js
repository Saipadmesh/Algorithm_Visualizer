import { useEffect, useState, useCallback } from "react";
import React from "react";
import styles from "./node.module.css";
import Sketch from "react-p5";
import { OrangeButton } from "./muiCustomStyle";

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  );

  return [isToggled, toggle];
};

const DisplayGrid = (props) => {
  const [p5, setP5] = useState();
  const [gheight, setgHeight] = useState(0);
  const [gwidth, setgWidth] = useState(0);
  const w = 20;
  const columns = Math.floor(gwidth / w);
  const rows = Math.floor(gheight / w);
  const [board, setBoard] = useState([]);

  // SETUP CANVAS
  let setup = (p5, canvasParentRef) => {
    setP5(p5);
    const cnv = p5.createCanvas(gwidth, gheight).parent(canvasParentRef);

    cnv.mouseClicked(() => {
      let x = Math.floor(p5.mouseX / w);
      let y = Math.floor(p5.mouseY / w);
      console.log("Location clicked: ", x, y);
      // console.log("Max size:", columns, rows);
      // console.log(props.board[x]);
      let copy = [...props.board];
      //console.log("copy", copy);
      copy[x][y] = 1;
      props.setBoard(copy);
    });
  };
  // DRAW INSIDE CANVAS, DEFAULT ON LOOP
  let draw = (p5) => {
    p5.background(255);
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (props.board[i][j] == 1) p5.fill(0);
        else p5.fill(255);
        p5.stroke(0);
        p5.rect(i * w, j * w, w - 1, w - 1);
      }
    }

    //simulateSorting();
  };
  // RESET FUNCTION
  function initialize() {
    console.log("entering initialize");
    let columns = props.board.length;
    let rows = props.board[0].length;

    let board1 = new Array(columns);
    for (let i = 0; i < columns; i++) {
      board1[i] = [1];
      for (let j = 0; j < rows - 2; j++) {
        if (i === 0 || i === columns - 1) {
          board1[i].push(1);
        } else {
          board1[i].push(0);
        }
      }
      board1[i].push(1);
    }
    props.setBoard(board1);
    //console.log(copy);
    //props.setBoard(copy);
  }

  const gridRef = useCallback((node) => {
    if (node !== null) {
      setgHeight(node.getBoundingClientRect().height);
      setgWidth(node.getBoundingClientRect().width);
      props.onChangeSize(rows, columns);
    }
  }, []);
  return (
    <>
      <div className={styles.grid_container}>
        <div className={styles.graph_grid}>
          <div className={styles.graph_grid_item} ref={gridRef}>
            <div>
              <Sketch setup={setup} draw={draw} className="grid" />
            </div>
          </div>
        </div>

        <div className={styles.item1}>
          <OrangeButton
            onClick={() => {
              //p5.loop();
              initialize();
            }}
          >
            Reset
          </OrangeButton>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default DisplayGrid;
