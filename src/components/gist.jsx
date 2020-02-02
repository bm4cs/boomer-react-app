import React, { Component } from "react";
import LoadFile from "./loadfile";

class Gist extends Component {

  render() {

    const { gist } = this.props;

    return (
      <div className="container">
        <h1>{Object.keys(gist.files)[0]}</h1>
          <div className="text-monospace">
            <LoadFile key={gist.id} url={gist.files[Object.keys(gist.files)[0]].raw_url}>
              {(text) => (
                {text}
              )}
            </LoadFile>
          </div>
      </div>
    )
  }
}

export default Gist;