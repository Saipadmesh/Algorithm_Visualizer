import { useEffect, useState, useCallback } from "react";
import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import React from "react";
import styles from "./node.module.css";
import Sketch from "react-p5";
import { OrangeButton } from "./muiCustomStyle";

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = React.useState(initialState);

  const toggle = React.useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  );

  return [isToggled, toggle];
};

const DisplayGrid = () => {
  const [values, setValues] = useState([]);
  const [status, setStatus] = useState([]);
  let i = 0;
  let j = 0;

  const [gheight, setgHeight] = useState(0);
  const [gwidth, setgWidth] = useState(0);
  const [p5, setP5] = useState();

  const [bubble, setBubble] = useToggle(false);
  const [quick, setQuick] = useToggle(false);
  const [mergeS, setMerge] = useToggle(false);
  const [common, setCommon] = useToggle(false);
  useEffect(() => console.log(common), [common]);
  // SETUP CANVAS
  let setup = (p5, canvasParentRef) => {
    setP5(p5);
    p5.createCanvas(gwidth, gheight).parent(canvasParentRef);
    //let values1 = [];
    let status1 = [];
    for (let i = 0; i < p5.width / 8; i++) {
      values.push(Math.random(p5.height) * p5.height);
      status1.push(-1);
    }
    setStatus(status1);
    //console.log("Status", status);

    //setValues(values1);
  };
  // DRAW INSIDE CANVAS, DEFAULT ON LOOP
  let draw = (p5) => {
    p5.background(200);
    if (bubble == true) {
      if (common == false) {
        setCommon();
      }
      bubbleSort();
    }

    if (common == false && quick == true) {
      setCommon();
      p5.noLoop();
      quickSort(0, values.length - 1);
      setQuick();
      p5.loop();
    }

    if (common == false && mergeS == true) {
      setCommon();
      //p5.noLoop();
      mergeSort(0, values.length - 1);
      setMerge();
      p5.loop();
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
      setStatus(status1);
      if (common == true) {
        setCommon();
      }
      setValues(values1);

      if (bubble == true) {
        setBubble();
      }
      if (quick == true) {
        setQuick();
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

        status[j] = -1;
        j++;
        status[j] = 1;

        if (j >= values.length - i - 1) {
          status[j] = 0;

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

  async function quickSort(start, end) {
    if (start > end) {
      return;
    }

    let index = await partition(start, end);
    // restore original state
    status[index] = 0;
    await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
  }

  async function partition(start, end) {
    for (let i = start; i < end; i++) {
      // identify the elements being considered currently
      status[i] = 1;
    }
    // Quicksort algorithm
    let pivotIndex = start;
    // make pivot index distinct
    status[pivotIndex] = 0;
    let pivotElement = values[end];
    for (let i = start; i < end; i++) {
      if (values[i] < pivotElement) {
        await swap(i, pivotIndex);
        status[pivotIndex] = -1;
        pivotIndex++;
        status[pivotIndex] = 0;
      }
    }
    await swap(end, pivotIndex);
    for (let i = start; i < end; i++) {
      // restore original state
      if (i != pivotIndex) {
        status[i] = -1;
      }
    }
    return pivotIndex;
  }

  // HELPER FUNCTION TO SLOW DOWN SIMULATION FOR QUICK SORT
  async function swap(i, j) {
    // adjust the pace of the simulation by changing the
    // value
    await sleep(25);
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function mergeSort() {
    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    var n = values.length;
    var curr_size;

    // For picking starting index of
    // left subarray to be merged
    var left_start;

    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
      // Pick starting povar of different
      // subarrays of current size
      for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
        // Find ending power of left
        // subarray. mid+1 is starting
        // power of right
        var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
        for (let i = left_start; i < right_end; i++) {
          // identify the elements being considered currently
          status[i] = 1;
        }
        var mid = Math.min(left_start + curr_size - 1, n - 1);
        status[mid] = 0;

        // Merge Subarrays arr[left_start...mid]
        // & arr[mid+1...right_end]
        await merge(left_start, mid, right_end);
      }
    }
    status[values.length - 1] = -1;
    //console.log(values);
  }
  // compare the lists element by element and return the concatenated resultList
  async function merge(start, mid, end) {
    var subArray1len = mid - start + 1;
    var subArray2len = end - mid;
    var L = new Array(subArray1len).fill(0);
    var R = new Array(subArray2len).fill(0);

    for (var i = 0; i < subArray1len; i++) {
      L[i] = values[start + i];
      //status[start + i] = 1;
      await sleep(15);
      //status[start + i] = 1;
      //await swap(L[i], values[start + i]);
    }

    for (var j = 0; j < subArray2len; j++) {
      R[j] = values[mid + 1 + j];
      await sleep(15);
      //status[mid + 1 + j] = 1;
      //await swap(R[j], values[mid + 1 + j]);
    }
    var i = 0;
    var j = 0;
    var k = start;

    while (i < subArray1len && j < subArray2len) {
      //status[i] = -1;
      //status[j] = -1;

      if (L[i] <= R[j]) {
        status[k] = -1;
        values[k] = L[i];
        await sleep(15);
        i++;
      } else {
        status[k] = -1;
        values[k] = R[j];
        await sleep(15);
        j++;
      }
      // status[i] = 1;
      // status[j] = 1;

      //await sleep(20);
      k++;
    }

    while (i < subArray1len) {
      status[k] = -1;
      values[k] = L[i];
      await sleep(15);
      i++;
      k++;
    }

    while (j < subArray2len) {
      status[k] = -1;
      values[k] = R[j];
      await sleep(15);
      j++;
      k++;
    }

    /*for (let i = start; i <= end; i++) {
      {
        status[i] = -1;
        await sleep(10);
      }
    }*/
  }

  // DRAW GRAPH ON CANVAS
  function simulateSorting() {
    if (p5) {
      //console.log("inside simulateSort", status);
      for (let i = 0; i < values.length; i++) {
        p5.stroke(252, 136, 12);
        if (status[i] == 0) {
          p5.fill(139, 69, 19);
        } else if (status[i] == 1) {
          p5.fill(255, 215, 0);
        } else {
          p5.fill(50);
        }
        p5.rect(i * 8, p5.height, 8, -values[i], 0);
      }
    }
  }

  const graphRef = useCallback((node) => {
    if (node !== null) {
      setgHeight(node.getBoundingClientRect().height);
      setgWidth(node.getBoundingClientRect().width);
    }
  }, []);
  return (
    <>
      <div className={styles.grid_container}>
        <div className={styles.graph_grid}>
          <div className={styles.graph_grid_item} ref={graphRef}>
            <div>
              <Sketch setup={setup} draw={draw} className="graph" />
            </div>
          </div>
        </div>

        <div className={styles.item1}>
          <OrangeButton
            onClick={() => {
              p5.loop();
              initialize();
            }}
          >
            Reset
          </OrangeButton>
          <br />
          <br />
          <OrangeButton
            onClick={() => {
              if (common == false) {
                setBubble();
              }
            }}
          >
            Bubble Sort
          </OrangeButton>
          <br />
          <br />
          <OrangeButton
            onClick={() => {
              if (common == false) {
                setQuick();
              }
            }}
          >
            Quick Sort
          </OrangeButton>
          <br />
          <br />
          <OrangeButton
            onClick={() => {
              if (common == false) {
                setMerge();
              }
            }}
          >
            Merge Sort
          </OrangeButton>
        </div>
      </div>
    </>
  );
};

export default DisplayGrid;
