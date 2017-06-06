"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Row extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {
    // respond to parameter change in scenario 3
    //let oldId = prevProps.params.invoiceId
    //let newId = this.props.params.invoiceId

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}
