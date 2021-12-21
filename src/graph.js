import { useEffect, useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";

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
          "age": node.age,
          "followers": node.followers,
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

  return (
    <ResponsiveNetwork
      nodes={data.nodes}
      links={data.links}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      repulsivity={60}
      iterations={60}
      nodeColor={function (e) {
        return e.color;
      }}
      nodeBorderWidth={1}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      linkThickness={function (e) {
        return 2 * (2 - e.source.depth);
      }}
      linkColor={{ theme: "grid.line.stroke" }}
      linkDistance={60}
      motionStiffness={160}
      motionDamping={12}
      tooltip={(input) => {
        return (
          <div>
            <b>Name: </b> {input.id} <br /> <b>Age: </b> {input.age} <br />
            <b>Followers: </b> {input.followers}
          </div>
        );
      }}
    />
  );
};

export default DrawGraph;
