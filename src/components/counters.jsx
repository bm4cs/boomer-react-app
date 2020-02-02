import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {

    console.log('Counters props', this.props);

    const { onReset, counters, onDelete, onIncrement } = this.props;

    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <div className="card-title">Counter Component</div>
          <div className="card-subtitle mb-2 text-muted">thx mosh</div>
          <button
            onClick={onReset}
            className="btn btn-primary btn-sm m-2"
          >
            Reset
          </button>
          {counters.map(c => (
            <Counter
              key={c.id}
              counter={c}
              onDelete={onDelete}
              onIncrement={onIncrement}
              selected={true}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Counters;
