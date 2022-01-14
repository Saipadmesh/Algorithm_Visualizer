import styles from "./node.module.css";
import DisplayGraph from "./sorting";
//import { useState, useCallback, useEffect } from "react";

function App() {
  // ----- UNUSED CODE FOR DJIKSTRA ALGORITHM, WILL BE IMPLEMENTED IN THE FUTURE -------------
  // const [board, setBoard] = useState([]);

  // useEffect(() => {
  //   if (rows !== 0 || columns !== 0) {
  //     console.log("Board reset", columns, rows);
  //     resetBoard();
  //   }
  // }, [rows, columns]);

  // useEffect(() => {
  //   console.log(board);
  // }, [board]);
  // function handleChangeSize(r, c) {
  //   setRows(r);
  //   setColumns(c);

  //   //console.log("inside handleChangeSize", columns, rows);
  // }
  // function resetBoard() {
  //   if (rows !== 0 || columns !== 0) {
  //     //console.log("resetBoard fn", columns, rows);
  //     let board1 = new Array(columns);
  //     for (let i = 0; i < columns; i++) {
  //       board1[i] = [1];
  //       for (let j = 0; j < rows - 2; j++) {
  //         if (i === 0 || i === columns - 1) {
  //           board1[i].push(1);
  //         } else {
  //           board1[i].push(0);
  //         }
  //       }
  //       board1[i].push(1);
  //     }
  //     setBoard(board1);
  //   }
  // }
  // ------------------------------------------------------------------------------------------

  return (
    <body className={styles.doc}>
      <h1
        style={{
          margin: "1vw",
          marginLeft: "2vw",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 48,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Sorting Visualizer
      </h1>
      <div className={styles.App}>
        <header className="App-header"></header>

        <DisplayGraph />
        <br />
        <br />
        <br />
        <div className={styles.bottom}>
          <div className={styles.footer}>
            A Project By{" "}
            <a href="https://linktr.ee/Saipadmesh" target="_blank">
              @Saipadmesh
            </a>
            <br />
            <br />
            Source Code available on{" "}
            <a
              href="https://github.com/Saipadmesh/Algorithm_Visualizer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 300"
            style={{ zIndex: 0 }}
          >
            <path
              fill="#426E86"
              fillOpacity="1"
              d="M0,192L34.3,186.7C68.6,181,137,171,206,176C274.3,181,343,203,411,208C480,213,549,203,617,181.3C685.7,160,754,128,823,117.3C891.4,107,960,117,1029,128C1097.1,139,1166,149,1234,170.7C1302.9,192,1371,224,1406,240L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </body>
  );
}

export default App;
