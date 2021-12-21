import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import { useState, useEffect } from "react";
import styles from "./node.module.css";
const WAIT_TIME = 2000;

function App() {
  const [nodeList, setNodeList] = useState([]);
  const [relList, setRelList] = useState([]);
  // useEffect for refreshing node list

  function handleChangeNodes(newValue) {
    setNodeList(nodeList.concat(newValue));
    //console.log(nodeList);
  }

  function handleChangeRelationships(newValue) {
    setRelList(relList.concat([newValue]));
    setNodeList(
      nodeList.map((node) => {
        if (node.name === newValue[0] || node.name === newValue[1]) {
          return {
            "id": node.id,
            "name": node.name,
            "age": node.age,
            "followers": node.followers + 1,
          };
        } else {
          return node;
        }
      })
    );
    //console.log(relList);
  }

  function handleDelRelationships(newValue) {
    //console.log(newValue);
    let filtered = [];
    filtered = relList.filter((arr) => {
      return arr.indexOf(newValue[0]) < 0 || arr.indexOf(newValue[1]) < 0;
    });
    //console.log(filtered);
    setRelList(filtered);
    setNodeList(
      nodeList.map((node) => {
        if (node.name === newValue[0] || node.name === newValue[1]) {
          //console.log(node.name);
          return {
            "id": node.id,
            "name": node.name,
            "age": node.age,
            "followers": node.followers - 1,
          };
        } else {
          return node;
        }
      })
    );
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
          Graph Visualizer
        </h1>
        <br />
        <div className={styles.grid_container}>
          <div className={styles.graph_grid}>
            <div className={styles.graph_grid_item}></div>
          </div>

          <div className={styles.item1}>
            <CreateNode nodes={nodeList} onChange={handleChangeNodes} />
          </div>
          <div className={styles.item2}>
            <CreateRelationship
              nodes={nodeList}
              relationships={relList}
              onChange={handleChangeRelationships}
              onDelete={handleDelRelationships}
            />
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
