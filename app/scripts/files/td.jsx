"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Td extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <td>{this.props.children}</td>
    );
  }
}
