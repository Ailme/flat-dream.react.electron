"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Container extends React.Component {
  static propTypes = {
    fluid: PropTypes.bool
  };
  static defaultProps = {
    fluid: false,
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
    let cn = this.props.fluid ? 'container-fluid' : 'container';
    return (
      <div className={cn}>
           {this.props.children}
      </div>
    );
  }
}
