import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Counters from "./components/counters";

class App extends Component {

  constructor() {
    super();
    console.log('App - Constructor');
  }

  componentDidMount() {
    console.log('App - Mounted');
  }



  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 3 },
      { id: 4, value: 2 }
    ]
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters: counters });
  };

  handleIncrement = counter => {
    console.log(counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });

    //this.setState({ counters: counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });

    this.setState({ counters: counters });
  };

  render() {

    console.log('App - Rendered');

    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.map(a => a.value).reduce((accumulator, currentValue) => accumulator + currentValue)}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
