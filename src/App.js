import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Home from "./components/home";
import Gist from "./components/gist";
import SideBar from "./components/sidebar";
import { Route, BrowserRouter } from 'react-router-dom'

class App extends Component {

  constructor() {
    super();
  }

  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 3 },
      { id: 4, value: 2 }
    ],
    gists: null
  };

  componentDidMount() {
    fetch('https://api.github.com/gists')
      .then(res => res.json())
      .then(gists => {
        this.setState({ gists });
      });
  }

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

    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar
            totalCounters={this.state.counters.map(a => a.value).reduce((accumulator, currentValue) => accumulator + currentValue)}
          />

          <div className="d-flex" id="wrapper">
            <SideBar gists={this.state.gists} />

            <div id="page-content-wrapper">
            
              <div className="container-fluid">

                <Route path="/" exact={true} render={(props) => 
                  <Home
                    {...props}
                    counters={this.state.counters}
                    onReset={this.handleReset}
                    onDelete={this.handleDelete}
                    onIncrement={this.handleIncrement} />
                }/>

                {this.state.gists && (
                  <Route path="/g/:gistId" render={(props) => {
                    return (
                      <Gist {...props} gist={this.state.gists.filter(g => g.id === props.match.params.gistId )[0]} />
                    )}
                  }/>
                )}

                
              {/* <Counters
    counters={this.state.counters}
    onReset={this.handleReset}
    onDelete={this.handleDelete}
    onIncrement={this.handleIncrement}
  /> */}

              </div>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
