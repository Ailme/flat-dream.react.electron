"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import Row from './table-row'

export default class TableBody extends React.Component {
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
      <tbody>
      {this.props.items.map((item, index) => {
        return (
          <Row key={index} item={item}/>
        )
      })}
      </tbody>
    );
  }
}
