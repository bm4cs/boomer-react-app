import React, { Component } from "react";

class LoadFile extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       content: null,
       url: null
    }
  }
  
  componentDidMount = () => {
    console.log('LoadFile component - mounted - ', this.props.url);

    this.setState({ url: this.props.url });

    fetch(this.props.url)
      .then(res => res.text())
      .then(res => {
        this.setState({
          content: res
        })
      })
  }

  componentWillUnmount() {
    console.log('LoadFile component - unmounted');
  }


  
  render() {
    const {content} = this.state
    return (
      <pre>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </pre>
    )
  }
}

export default LoadFile;