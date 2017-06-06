"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
import ClassNames  from 'classnames';
/*eslint-enable */

export default class Col extends React.Component {
  static propTypes = {
    xs: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    lg: PropTypes.number,
    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    className: PropTypes.string,
  };
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
    let cn = ClassNames({
      [`col-xs-${this.props.xs}`]: this.props.xs > 0,
      [`col-sm-${this.props.sm}`]: this.props.sm > 0,
      [`col-md-${this.props.md}`]: this.props.md > 0,
      [`col-lg-${this.props.lg}`]: this.props.lg > 0,
      [`col-xs-offset-${this.props.xsOffset}`]: this.props.xsOffset > 0,
      [`col-sm-offset-${this.props.smOffset}`]: this.props.smOffset > 0,
      [`col-md-offset-${this.props.mdOffset}`]: this.props.mdOffset > 0,
      [`col-lg-offset-${this.props.lgOffset}`]: this.props.lgOffset > 0,
      [`${this.props.className}`]: this.props.className && this.props.className.length,
    });

    return (
      <div className={cn}>
           {this.props.children}
      </div>
    );
  }
}
