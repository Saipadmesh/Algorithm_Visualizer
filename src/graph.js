import { useEffect, useState } from "react";
import Sigma from "sigma";
import Graph from "graphology";

const DrawGraph = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    let node1 = [];
    if (props.nodelist != {}) {
      node1 = props.nodelist.map((node) => {
        return {
          "id": node.name,
          "color": "rgb(255,165,0)",
          "radius": 11,
          "depth": 0.5,
          "name": node.name,
        };
      });
    }
    let rel1 = [];
    //console.log(props.rellist);
    if (props.rellist != []) {
      rel1 = props.rellist.map((rel) => {
        return { "source": rel[0], "target": rel[1], "distance": 10 };
      });
    }
    let data1 = {
      "nodes": node1,
      "links": rel1,
    };
    setData(data1);
    //console.log(rel1);
    //console.log(data.links);
  }, [props.nodelist, props.rellist]);

  //Sigma
  graphRef = React.createRef();
  const renderer = new Sigma(data, graphRef);
  const camera = renderer.getCamera();

  return <div ref={graphRef}></div>;
};

export default DrawGraph;
