import styles from "./node.module.css";
import DisplayGraph from "./sorting";
import DisplayGrid from "./pathfinding";
import { useState, useCallback, useEffect } from "react";

const WAIT_TIME = 2000;

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  );

  return [isToggled, toggle];
};
function App() {
  const [columns, setColumns] = useState(56);
  const [rows, setRows] = useState(32);

  const [board, setBoard] = useState([]);

  useEffect(() => {
    if (rows !== 0 || columns !== 0) {
      console.log("Board reset", columns, rows);
      resetBoard();
    }
  }, [rows, columns]);

  useEffect(() => {
    console.log(board);
  }, [board]);
  function handleChangeSize(r, c) {
    setRows(r);
    setColumns(c);

    //console.log("inside handleChangeSize", columns, rows);
  }
  function resetBoard() {
    if (rows !== 0 || columns !== 0) {
      //console.log("resetBoard fn", columns, rows);
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
      setBoard(board1);
    }
  }

  return (
    <body className={styles.doc}>
      <div className={styles.App}>
        <header className="App-header"></header>
        <h1
          style={{
            margin: 10,
            fontFamily: "'Fjalla One', sans-serif",
            fontSize: 60,
          }}
        >
          Algorithm Visualizer
        </h1>
        <br />
        <DisplayGraph />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <DisplayGrid
          board={board}
          onChangeSize={handleChangeSize}
          columns={columns}
          rows={rows}
          setBoard={setBoard}
        />
      </div>
    </body>
  );
}

export default App;
