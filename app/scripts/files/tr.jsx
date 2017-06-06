"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Tr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <tr>{this.props.children}</tr>
    );
  }
}
