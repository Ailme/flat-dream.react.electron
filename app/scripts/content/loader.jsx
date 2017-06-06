"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Loader extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  };
  static defaultProps = {
    show: false
  };

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
    if (!this.props.show) {
      return null;
    }

    return (
      <i className="fa fa-spinner fa-spin fa-fw"/>
    );
  }
}
