import React, { Component, Fragment } from "react";
import Counters from "./counters";

const Home = (props) => {
  return (
    <Fragment>
      <h1>Welcome to Ben's react router playground</h1>

      <Counters
        counters={props.counters}
        onReset={props.onDelete}
        onDelete={props.onDelete}
        onIncrement={props.onIncrement}
      />

      <div style={{ paddingTop: '30px' }}>
        <img src="https://i.imgur.com/JoNHc6K.jpg" alt="IBM a long time ago..." style={{ width: 700 }} />
      </div>

    </Fragment>
  );
}

export default Home;