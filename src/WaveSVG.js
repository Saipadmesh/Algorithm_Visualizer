import React, { Component } from "react";
import sizeMe from "react-sizeme";

class Waves extends Component {
  render() {
    const { width } = this.props.size.width;

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={"0 0 " + 1440 + " 300"}
          width={width}
          style={{ zIndex: 3 }}
        >
          <path
            fill="#426E86"
            fillOpacity="1"
            d="M0,192L34.3,186.7C68.6,181,137,171,206,176C274.3,181,343,203,411,208C480,213,549,203,617,181.3C685.7,160,754,128,823,117.3C891.4,107,960,117,1029,128C1097.1,139,1166,149,1234,170.7C1302.9,192,1371,224,1406,240L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </>
    );
  }
}

export default sizeMe()(Waves);
