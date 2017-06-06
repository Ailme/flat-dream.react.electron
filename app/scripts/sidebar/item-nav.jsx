"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class ItemNav extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onSelect: PropTypes.func
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  onClick(event) {
    this.props.onSelect(event, event.target.dataset.id);
  }

  render() {
    return (
      <li className="nav-item">
        <a className="nav-link text-lowercase" href="javascript:void(0)" data-id={this.props.id}
           onClick={this.onClick.bind(this)}>{this.props.text}</a>
      </li>
    )
  }
}
