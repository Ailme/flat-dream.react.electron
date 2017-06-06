"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import ItemNav from './item-nav';

export default class Nav extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  };
  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  onSelect(event) {
    this.props.onSelect(event.target.dataset.id);
  }

  render() {
    return (
      <ul className="nav nav-sidebar">
          {this.props.items.map((item) => {
            return <ItemNav key={item.id} id={item.id} text={item.address} onSelect={this.onSelect.bind(this)}/>;
          })}
      </ul>
    )
  }
}
