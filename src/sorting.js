import { useEffect, useState, useCallback } from "react";
import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import React from "react";
import styles from "./node.module.css";
import Sketch from "react-p5";
import { OrangeButton } from "./muiCustomStyle";

const DisplayGrid = () => {
  const [values, setValues] = useState([]);
  let i = 0;
  let j = 0;

  const [gheight, setgHeight] = useState(0);
  const [gwidth, setgWidth] = useState(0);
  const [p5, setP5] = useState();

  let setup = (p5, canvasParentRef) => {
    setP5(p5);
    p5.createCanvas(gwidth, gheight).parent(canvasParentRef);
    initialize();
  };
  let draw = (p5) => {
    p5.background(200);
    //bubbleSort();
    simulateSorting();
  };

  function initialize() {
    if (p5) {
      let values1 = [];
      for (let i = 0; i < p5.width / 8; i++) {
        values1.push(Math.random(p5.height) * p5.height);
      }
      setValues(values1);
    }
  }

  function bubbleSort() {
    for (let k = 0; k < 8; k++) {
      if (i < values.length) {
        let temp = values[j];
        if (values[j] > values[j + 1]) {
          values[j] = values[j + 1];
          values[j + 1] = temp;
        }
        j++;

        if (j >= values.length - i - 1) {
          j = 0;
          i++;
        }
      } else {
        break;
      }
    }
  }

  function simulateSorting() {
    if (p5) {
      for (let i = 0; i < values.length; i++) {
        p5.stroke(252, 136, 12);
        p5.fill(50);
        p5.rect(i * 8, p5.height, 8, -values[i], 0);
        console.log(i);
      }
    } else {
      console.log("not inside simulate");
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
          <OrangeButton>Reset</OrangeButton>
        </div>
      </div>
    </>
  );
};

export default DisplayGrid;
