"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class TableHead extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <thead className="thead-default">
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      </thead>
    );
  }
}
