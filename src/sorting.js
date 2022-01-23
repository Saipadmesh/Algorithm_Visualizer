import { useState, useCallback, useEffect } from "react";
import React from "react";
import styles from "./node.module.css";
import Sketch from "react-p5";
import reseticon from "./images/reseticon.png";

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  );

  return [isToggled, toggle];
};

const DisplayGraph = () => {
  const [p5, setP5] = useState();
  const [values, setValues] = useState([]);
  const [status, setStatus] = useState([]);
  let i = 0;
  let j = 0;

  const [gheight, setgHeight] = useState(0);
  const [gwidth, setgWidth] = useState(0);
  useEffect(() => {
    console.log(gwidth);
  }, [gwidth]);

  const [bubble, setBubble] = useToggle(false);
  const [insert, setInsert] = useToggle(false);
  const [select, setSelect] = useToggle(false);
  const [quick, setQuick] = useToggle(false);
  const [mergeS, setMerge] = useToggle(false);
  const [common, setCommon] = useToggle(false);

  // SETUP CANVAS
  let setup = (p5, canvasParentRef) => {
    setP5(p5);
    p5.createCanvas(gwidth, gheight).parent(canvasParentRef);

    let status1 = [];
    for (let i = 0; i < p5.width / 8; i++) {
      values.push(Math.random(p5.height) * p5.height);
      status1.push(-1);
    }
    setStatus(status1);
  };

  // WINDOW RESIZE
  let windowResize = (p5) => {
    p5.resizeCanvas(gwidth, gheight);
  };

  // DRAW INSIDE CANVAS, DEFAULT ON LOOP
  let draw = (p5) => {
    // Background of the canvas
    p5.background(247, 253, 255);
    if (bubble === true) {
      if (common === false) {
        setCommon();
      }
      bubbleSort();
    }
    if (common === false && insert === true) {
      setCommon();
      //p5.noLoop();
      insertionSort();
      setInsert();
      //p5.loop();
    }

    if (common === false && select === true) {
      setCommon();
      //p5.noLoop();
      selectionSort();
      setSelect();
      //p5.loop();
    }

    if (common === false && quick === true) {
      setCommon();
      //p5.noLoop();
      quickSort(0, values.length - 1);
      setQuick();
      //p5.noLoop();
    }

    if (common === false && mergeS === true) {
      setCommon();
      //p5.noLoop();
      mergeSort(0, values.length - 1);
      setMerge();
      //p5.loop();
    }
    simulateSorting();
  };
  // RESET FUNCTION
  function initialize() {
    if (p5) {
      p5.loop();
      let values1 = [];
      let status1 = new Array(values.length).fill(-1);
      for (let i = 0; i < p5.width / 8; i++) {
        values1.push(Math.random(p5.height) * p5.height);
      }
      i = 0;
      j = 0;
      setStatus(status1);
      if (common === true) {
        setCommon();
      }
      setValues(values1);

      if (bubble === true) {
        setBubble();
      }
      if (insert === true) {
        setInsert();
      }
      if (select === true) {
        setSelect();
      }
      if (quick === true) {
        setQuick();
      }
      if (mergeS === true) {
        setMerge();
      }
    }
  }

  // SORTING ALGORITHMS

  function bubbleSort() {
    for (let k = 0; k < 8; k++) {
      if (i < values.length) {
        status[j] = 1;
        let temp = values[j];
        if (values[j] > values[j + 1]) {
          values[j] = values[j + 1];
          values[j + 1] = temp;
        }

        status[j] = 0;
        j++;
        status[j] = 1;

        if (j >= values.length - i - 1) {
          status[j] = -1;

          j = 0;
          i++;
        }
      } else {
        status[j] = 0;
        p5.noLoop();
        break;
      }
    }
  }

  async function insertionSort() {
    for (let i = 1; i < values.length; i++) {
      let key = values[i];
      j = i - 1;

      while (j >= 0 && values[j] > key) {
        status[i] = 0;
        status[j] = 1;
        await sleep(8);
        values[j + 1] = values[j];
        j = j - 1;
        status[j + 1] = -1;
      }

      values[j + 1] = key;
    }
    status[values.length - 1] = -1;
    p5.noLoop();
  }

  async function selectionSort() {
    if (p5) {
      for (let i = 0; i < values.length - 1; i++) {
        let min_idx = i;
        status[i] = 0;

        for (let j = i + 1; j < values.length; j++) {
          status[j] = 1;
          if (values[j] < values[min_idx]) {
            min_idx = j;
          }
          await sleep(1);
          status[j] = -1;
        }
        await sleep(30);

        await swap(min_idx, i);
        status[i] = -1;
      }
      status[values.length - 1] = -1;
      //p5.noLoop();
    }
  }

  async function quickSort(start, end) {
    if (start > end) {
      return;
    }

    let index = await partition(start, end);
    // restore original state
    await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
  }

  async function partition(start, end) {
    for (let i = start; i <= end; i++) {
      // identify the elements being considered currently
      status[i] = 1;
    }
    // Quicksort algorithm
    let pivotIndex = start;
    // make pivot index distinct
    status[pivotIndex] = -1;
    let pivotElement = values[end];
    for (let i = start; i <= end; i++) {
      if (values[i] < pivotElement) {
        await swap(i, pivotIndex);
        status[pivotIndex] = 0;
        pivotIndex++;
        status[pivotIndex] = -1;
      }
    }
    await swap(end, pivotIndex);
    for (let i = start; i <= end; i++) {
      // restore original state
      if (i !== pivotIndex) {
        status[i] = -1;
      }
    }
    return pivotIndex;
  }

  // HELPER FUNCTION TO SLOW DOWN SIMULATION FOR QUICK SORT
  async function swap(i, j) {
    // adjust the pace of the simulation by changing the
    // value
    await sleep(40);
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  // HELPER FUNCTION TO SLOW SIMULATION
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function mergeSort() {
    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    var n = values.length;
    var curr_size;

    var left_start;

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
      for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
        var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
        for (let i = left_start; i <= right_end; i++) {
          // identify the elements being considered currently
          status[i] = 1;
        }
        var mid = Math.min(left_start + curr_size - 1, n - 1);
        status[mid] = 0;
        await merge(left_start, mid, right_end);
      }
    }
    status[values.length - 1] = -1;
  }
  async function merge(start, mid, end) {
    var subArray1len = mid - start + 1;
    var subArray2len = end - mid;
    var L = new Array(subArray1len).fill(0);
    var R = new Array(subArray2len).fill(0);

    for (var i = 0; i < subArray1len; i++) {
      L[i] = values[start + i];
      await sleep(20);
    }

    for (var j = 0; j < subArray2len; j++) {
      R[j] = values[mid + 1 + j];
      await sleep(20);
    }
    var i = 0;
    var j = 0;
    var k = start;

    while (i < subArray1len && j < subArray2len) {
      if (L[i] <= R[j]) {
        status[k] = -1;
        values[k] = L[i];
        await sleep(20);
        i++;
      } else {
        status[k] = -1;
        values[k] = R[j];
        await sleep(20);
        j++;
      }

      k++;
    }

    while (i < subArray1len) {
      status[k] = -1;
      values[k] = L[i];
      await sleep(20);
      i++;
      k++;
    }

    while (j < subArray2len) {
      status[k] = -1;
      values[k] = R[j];
      await sleep(20);
      j++;
      k++;
    }
  }

  // DRAW GRAPH ON CANVAS
  function simulateSorting() {
    if (p5) {
      for (let i = 0; i < values.length; i++) {
        p5.stroke(252, 136, 12);
        if (status[i] === 0) {
          p5.fill(141, 66, 1);
        } else if (status[i] === 1) {
          p5.fill(254, 172, 36);
        } else {
          p5.fill(50);
        }
        p5.rect(i * 8, p5.height, 8, -values[i], 0);
      }
    }
  }

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setgHeight(Math.floor(node.getBoundingClientRect().height / 8) * 8);
      setgWidth(Math.floor(node.getBoundingClientRect().width / 8) * 8);
    }
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-9 mt-5" style={{ paddingLeft: "5%" }}>
          <div className={styles.graph_grid_item} ref={graphRef}>
            <Sketch
              setup={setup}
              draw={draw}
              windowResized={windowResize}
              className="graph"
            />
          </div>
          <div className="d-flex justify-content-end pt-3">
            <button
              type="button"
              className={styles.ResetButton}
              onClick={() => {
                p5.loop();
                initialize();
              }}
            >
              <img src={reseticon} alt="" />
            </button>
          </div>
        </div>
        <div className="col-md-3 my-auto">
          <div className="d-flex flex-column align-items-center">
            <div className="py-3 align-items-center">
              <h1 style={{ fontWeight: 400 }}>Sort Types</h1>
              <div className={styles.line1}></div>
            </div>

            <button
              type="button"
              className={styles.OrangeButton}
              onClick={() => {
                if (common === false) {
                  setBubble();
                }
              }}
            >
              Bubble Sort
            </button>

            <button
              type="button"
              className={styles.OrangeButton}
              onClick={() => {
                if (common === false) {
                  setInsert();
                }
              }}
            >
              Insertion Sort
            </button>

            <button
              type="button"
              className={styles.OrangeButton}
              onClick={() => {
                if (common === false) {
                  setSelect();
                }
              }}
            >
              Selection Sort
            </button>

            <button
              type="button"
              className={styles.OrangeButton}
              onClick={() => {
                if (common === false) {
                  setQuick();
                }
              }}
            >
              Quick Sort
            </button>

            <button
              type="button"
              className={styles.OrangeButton}
              onClick={() => {
                if (common === false) {
                  setMerge();
                }
              }}
            >
              Merge Sort
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayGraph;
