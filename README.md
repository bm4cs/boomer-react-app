

Ben's notes about deving React.

To get started:

    `create-react-app yacra`

This will scaffold out a functioning React app, with webpack and babel ready to go. Then bootstrap.

    npm i bootstrap@4.1.1


In React, everything is just Javascript. JSX takes this to the next level, providing syntactic sugar to crunch out lots of `React.createElement`, based on a HTML-esk syntax. babel.js takes care of the transpilation from HTML looking tags to actual Javascript. To get a real sense of this, go to [babeljs.io/repl](https://babeljs.io/repl) and type in `const element = <h1>hello world</h1>;`. You'll see this get translated to:

    "use strict";
    var element = React.createElement("h1", null, "hello world");


# Components

Within the `./src/components` dir, create new jsx file to represent the component.

```javascript
import React, { Component } from "react";

class Counter extends Component {
  //state = {}
  render() {
    return (
      <React.Fragment>
        <h1>hello world</h1>
        <button>Increment</button>
      </React.Fragment>
    );
  }
}

export default Counter;
```


## DOM control

JSX expressions must have a single parent element, because babel needs a single `React.createElement` parent, before populating it with many child elements. Using a single outer `<div` would be one option, but if you really don't want to include any outer DOM, can use the `React.Fragment` shown above.



## Styling

Because JSX needs to boil down into JS, reserved JS keywords like `class` cannot be used in JSX. To set the class of an element, must use `className`.

```jsx
<React.Fragment>
  <img src={this.state.imageUrl} alt="" />
  <span className="">{this.formatCount()}</span>
  <button>Increment</button>
</React.Fragment>
```

While using CSS classes is best, inline styles can be acheived by setting the `style` attribute on a JSX element to a Javascript object, like so:

```javascript
styles = {
  fontSize: 12,
  fontWeight: "bold"
};

render() {
  return (
    <React.Fragment>
      <span style={this.styles} className="badge badge-primary m-2">
        {this.formatCount()}
      </span>
```

Or using an anonymous object like so:

   <span style={{ fontSize: 30 }} className="badge badge-primary m-2">


## Rendering Lists

The `map` (higher order) function, can be used to deal with lists:

```js
class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.tags.map(tag => (
            <li>{tag}</li>
          ))}
        </ul>
```

This will render a list of naked `li`, however React will throw a *warning* in the console:

> Warning: Each child in a list should have a unique "key" prop.

In order to do virtual DOM to DOM comparison, React needs unique identifiers on everything. As there is no `id` on these `li`'s, the `key` attribute can be used:

    <li key={tag}>{tag}</li>



## Handling Events

JSX provides event handler attributes such as `onClick`:

```js
handleIncrement() {
  console.log("Increment clicked", this.state.count);
}

render() {
  return (
    <React.Fragment>
      <button
        onClick={this.handleIncrement}
        className="btn btn-secondary btn-sm"
      >
        Increment
      </button>
```


## State Management

In the above click handler, the `console.log` fails with:

> TypeError: this is undefined

`this` in JS is context dependent. If a method is called on an object `obj.method()` then `this` is a reference to that object. However if a function is called statically i.e. `function();` then `this` is a reference to the window object, or in strict mode `undefined`.

React rule of thumb:

> The component that owns some state, should be responsible for mutating it.



### Option 1: Binding

In the constructor of the component, after calling `super()` can bind `this` to the static function like so:

    constructor() {
      super();
      this.handleIncrement = this.handleIncrement.bind(this);
    }

`this` is now available to the event handler function.

### Option 2: Arrows

Just use an arrow function:

    handleIncrement = () => {
      console.log("Increment clicked", this.state.count);
    };



Now that the event handler has `this` access, cannot just start mutating it, for example `this.state.count++` will not affect the UI, as React is not aware that this custom piece of state has changed, and what is impacted by the state change.

To change state, React provides `setState`:

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };


## Passing Parameters

It is common to want to pass some state along to the event handler, when its invoked.

One option is to create a wrapper function:

    handleIncrement = product => {
      console.log(product);
      this.setState({ count: this.state.count + 1 });
    };

    doHandleIncrement = () => {
      this.handleIncrement({ id: 1 });
    };

    render() {
      return (
        <React.Fragment>
          <button
            onClick={this.doHandleIncrement}
            className="btn btn-secondary btn-sm"
          >
            Increment
          </button>

For consiseness wrapper function can be represented as an inline function:


    <button
      onClick={() => this.handleIncrement({ id: 1 })}
      className="btn btn-secondary btn-sm"
    >
      Increment
    </button>






# Components

A React app is a tree of components. In `index.js` is kicked off with the:

    ReactDOM.render(<Counter />, document.getElementById("root"));

To compose many `Counter` components, one option is to create an outer `Counters` component:


    import React, { Component } from "react";
    import Counter from "./counter";
    
    class Counters extends Component {
      state = {
        counters: [
          { id: 1, value: 0 },
          { id: 2, value: 0 },
          { id: 3, value: 0 },
          { id: 4, value: 0 }
        ]
      };
    
      render() {
        return (
          <div>
            {this.state.counters.map(c => (
              <Counter key={c.id} />
            ))}
          </div>
        );
      }
    }
    
    export default Counters;



## Passing Data

While the above `Counters` component successfully composes several `Counter`'s from a list, it does not pass state to the child components.

State can be propagated to child components, as attribute like so:

    <Counter key={c.id} value={c.value} selected={true} />

This state is exposed to the target components as `props`. A console log in child component `Counter` render method:

    render() {
      console.log("props", this.props);

Results in:

    props Object { value: 0, selected: true, … }
    props Object { value: 0, selected: true, … }
    props Object { value: 3, selected: true, … }
    props Object { value: 0, selected: true, … }

`props` can be used throughout the component, and even directly in the component `state`, like so:

    class Counter extends Component {
      state = {
        count: this.props.value,
        tags: ["tag1", "tag2", "tag3"],
        imageUrl: "https://picsum.photos/200",
        address: {
          street: ""
        }
      };


### Passing Children

Previously the `Counters` component, composed many `Counter` instances, like so, while defining a few `props`:

    <div>
      {this.state.counters.map(c => (
        <Counter key={c.id} value={c.value} selected={true} />
      ))}
    </div>

To make components even more useful, its possible to pass in inner JSX content, for example:

    <Counter key={c.id} value={c.value} selected={true}>
      <h2>semaphore</h2>
    </Counter>

The `props` of the child component, exposes this `h2` via a list called `children`:

    props {…}
            children: {…}
              "$$typeof": Symbol(react.element)
              _owner: Object { tag: 1, key: null, index: 0, … }
              _self: Object { props: {}, context: {}, refs: {}, … }
              _source: Object { fileName: "./src/components/counters.jsx", lineNumber: 19 }
              _store: Object { … }
              key: null
              props: Object { children: "semaphore" }
              ref: null
              type: "h2"
              <prototype>: Object { … }
            key: 
            selected: true
            value: 0
            <get key()>: function warnAboutAccessingKey()
            <prototype>: {…

To make use of the `props.children` property is easy:

    render() {
      return (
        <React.Fragment>
          {this.props.children}
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
This will render the children as defined in the calling component, in this case an `h2` tag will be emitted.


Interestingly `props` is immutable, and can't be modified, `state` should be used.




## Raising and Handling Events between Components

State management rule of thumb:

> The component that owns some state, should be responsible for mutating it.

A common scenario is for parent or outer components to define the state that is consumed by downstream components. Given the rule of thumb above, how should a downstream component go about modifying the original state?

One good option is the *observer pattern*, in which a child component raises an event, which can be handled by its parent component to react and respond to a state change.

For example, the `Counters` component defines several `Counter` components. A component can elect to delete itself by displaying a delete button to the user. If clicked, the `Counter` instance could raise an `onDelete` event. `Counters` could handle this event with `handleDelete()`.

In the `Counters` component:

* create event handler e.g. `handleDelete` responsible for mutating the original state that relates to the event. *important* in React, you can't just mutate state and expect React to know about it, instead you must reassign the state using Reacts `setState` function (see below)
* pass this handler function downstream to `Counter` components as `props`


    class Counters extends Component {
      state = {
        counters: [
          { id: 1, value: 0 },
          { id: 2, value: 0 },
          { id: 3, value: 3 },
          { id: 4, value: 2 }
        ]
      };
    
      handleDelete = counterId => {
        console.log("Event handler called", counterId);
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({ counters: counters });
      };
    
      render() {
        return (
          <div>
            {this.state.counters.map(c => (
              <Counter
                key={c.id}
                value={c.value}
                onDelete={this.handleDelete}
                selected={true}
              />
            ))}
          </div>


Using the *React Developer Tools* browser extension, can drill down into `Counters` to an individual `Counter` instance, and check out its Props (right hand panel) - note the `onDelete` prop:

    Props
      onDelete: handleDelete()
      selected: true
      value: 0

In the `Counter` component, simply need to wire in the `onDelete` now available in `props` to the `onClick`:

    <button
      onClick={() => this.props.onDelete(this.props.id)}
      className="btn btn-danger btn-sm m-2"
    >


### Passing Object props

Over time, the number of individual `props` defined may continue to swell, like so:

    <Counter
      key={c.id}
      value={c.value}
      onDelete={this.handleDelete}
      selected={true}
    />

Instead, of mapping each field as a prop, why not pass the entire object (in this case called `counter`) along:


    <Counter
      key={counter.id}
      counter={counter}
    />

Make sure to update affected `props` reference in the child components:

    class Counter extends Component {
      state = {
        count: this.props.counter.value,
        ...


### Controlled Components

Local state within components, can cause components to get out of wack. For example, when setting the initial `state` of a child component from `props` only happens when the component is created. Future changes to state in the parent, that was passed down as `props` to its children, will not flow through after initial creation.

A *controlled component* is one that:

* Receives essential data needed to render via `props` from its parent.
* Never manages this as `state` locally, but instead fires events to request the data be updated back in the parent.

Refactoring steps:

* Remove any local `state`
* Any references to `this.state` should be updated to use `props` directly, and trigger events to communicate with the parent (observer) where needed.


    <button
      onClick={() => this.props.onIncrement(this.props.counter)}
      className="btn btn-secondary btn-sm"
    >



## Synchronising Components

Sometimes, as the architecture of the view changes, new components get introduced. This can modify the shape of the component tree.

For example, introducing a navbar component that requires access to the state of another *unrelated* component.

The general pattern for this is known as *lifting the state* upwards. The higher in the tree the state lives, the more widely it can be propagated through other downstream components.

The `Counters` component used to be responsible for managing the `counters` in its own `state`, rendering each child `Counter` component. Lifting this state upwards to top level `App` component, means refactoring `this.state` access with `this.props` accessors. Event handlers must bubble upwards too:

    <Counter
      key={c.id}
      counter={c}
      onDelete={this.props.onDelete}
      onIncrement={this.props.onIncrement}
      selected={true}

In the top level `App` component, the render can now propagate state as needed, for example only passing the `totalCounters` to the `NavBar` component, while passing down the full counter objects to `Counters`:

    render() {
      return (
        <React.Fragment>
          <NavBar
            totalCounters={this.state.counters.filter(c => c.value > 0).length}
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



## Functional Components

TODO: 2:06:24


## Lifecycle Hooks




# Debugging

Get the *React Developer Tools* Chrome or FF extension.

Using the newly provided *React* tab within dev tools, will now be able to clearly view the tree hierarchy of React components.

Component in this view are selectable, and will be assigned to variable `$r`, like so:


    <Counters>
      <div>
        <Counter key="1" value={0} selected={true}>...</Counter> == $r
        <Counter key="2" value={0} selected={true}>...</Counter>
        <Counter key="3" value={3} selected={true}>...</Counter>
        <Counter key="4" value={2} selected={true}>...</Counter>
      </div>
    </Counters>

In the same way selecting a piece of DOM with the *Elements* tab would assign it to `$0`. Using the `$r` reference in the *Console* can begin to inspect and play with it:

* call its `render()`
* 
