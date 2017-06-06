"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import Tr from './tr';
import Td from './td';

export default class TableRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {}
  }

  renderStatus(item) {
    if (item.loading) {
      return <i className="fa fa-spinner fa-spin fa-fw"/>;
    }

    if (item.upload == null) {
      return null;
    }

    return item.upload ?
      <i className="fa fa-fw fa-check text-success"/> :
      <i className="fa fa-fw fa-ban text-warning"/>;
  }

  render() {
    let {item} = this.props;
    return (
      <Tr>
        <Td><img src={item.url} height={48} className="img-rounded"/></Td>
        <Td>
          <p className="text-primary">{item.name}</p>
          <p className="text-info">{item.convert.name}</p>
        </Td>
        <Td>
          <p className="text-primary">{item.width && item.height ? item.width + "x" + item.height : null}</p>
          <p
            className="text-info">{item.convert.width && item.convert.height ? item.convert.width + "x" + item.convert.height : null}</p>
        </Td>
        <Td>
          <p className="text-primary">{item.size}</p>
          <p className="text-info">{item.convert.size}</p>
        </Td>
        <Td>
          {this.renderStatus(item)}
        </Td>
      </Tr>
    );
  }
}
