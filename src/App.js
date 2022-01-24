import styles from "./node.module.css";
import DisplayGraph from "./sorting";
import WaveSVG from "./WaveSVG";
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
    <>
      <div className="container-fluid p-0 w-100 ">
        <div className="row">
          <div className="col-md-7 my-3 ps-4">
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 48,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Sorting Visualizer
            </h1>
          </div>
        </div>
        <div className="row m-0 p-0">
          <div className="col-md-11 m-0 p-0">
            {/* <div className="d-flex flex-column p-0"> */}
            <div className={styles.App}>
              <DisplayGraph />
              <div className="row mt-md-5" style={{ marginTop: 40 }}></div>
              <div
                className="row-auto"
                // style={{ backgroundColor: "rgb(66,110,134)" }}
              >
                <br />
                <div
                  className="col-md-12 mt-auto p-0"
                  style={{ position: "relative" }}
                >
                  <div style={{ bottom: 0 }}>
                    <WaveSVG />
                  </div>
                  <div className={styles.footer}>
                    A Project By{" "}
                    <a
                      href="https://linktr.ee/Saipadmesh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Saipadmesh
                    </a>
                    <br />
                    Source Code available on{" "}
                    <a
                      href="https://github.com/Saipadmesh/Algorithm_Visualizer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
