"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Title extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    return (
      <ol className="breadcrumb">
        <li className="active text-lowercase">{this.props.text}</li>
      </ol>
    )
  }
}
