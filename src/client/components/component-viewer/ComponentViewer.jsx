"use strict";
import React from 'react';


class ComponentViewer extends React.Component {
  constructor() {
    super()
  }

  render() {
    let Component = this.props.component;

    return (
      <div className="componentViewer">
        <h3 className="-title">{this.props.title}</h3>
        <div className="-component">
          <Component {...this.props.fixtureProps} />
        </div>
      </div>
    );
  }
}

ComponentViewer.propTypes = {
  component: React.PropTypes.objectOf(React.Component),
  name: React.PropTypes.string
};

export default ComponentViewer;
