"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import Search from './search';
import Nav from './nav';
import Col from '../col';

export default class Sidebar extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };
  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Col className="sidebar" sm={4} md={4}>
        <Search onChange={this.props.onFilter}/>
        <Nav items={this.props.items} onSelect={this.props.onSelect}/>
      </Col>
    )
  }
}
