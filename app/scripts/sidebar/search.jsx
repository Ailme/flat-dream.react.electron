"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Search extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  handleChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input type="search" className="form-control form-control-sm" placeholder="фильтр..."
                 onChange={this.handleChange.bind(this)}/>
        </div>
      </form>
    )
  }
}
