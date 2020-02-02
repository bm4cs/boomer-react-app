import React, { Component } from "react";
import { Link } from 'react-router-dom'

class SideBar extends Component {

  render() {

    const { gists } = this.props;

    return (
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Router Fun</div>
        <div className="list-group list-group-flush">
          { gists ? (
                gists.filter(gist => gist.description !== '').map(gist => (
                  <Link key={gist.id} to={`/g/${gist.id}`} className="list-group-item list-group-item-action bg-light">
                  {gist.description}
                  </Link>
                ))
              ) : (
                <div>Loading...</div>
              )}
        </div>
      </div>
    );
  }
}

export default SideBar;
