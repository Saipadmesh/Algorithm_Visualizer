import React from "react";
import styles from "./node.module.css";
import p5 from "p5";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.values = [];
    this.i = 0;
    this.j = 0;
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(200, 200);
    };

    p.draw = () => {
      p.background(50);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
