"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import Head from './table-head';
import Body from './table-body';

export default class Table extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <table className="table table-striped table-sm images">
        <Body items={this.props.items}/>
      </table>
    );
  }
}
