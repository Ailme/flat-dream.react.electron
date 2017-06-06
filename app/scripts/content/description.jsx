"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */

export default class Description extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
  };

  onChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <form>
        <fieldset className="form-group">
          <textarea className="form-control" rows="20" value={this.props.value}
                    onChange={this.onChange.bind(this)}/>
        </fieldset>
        <fieldset className="form-group">
          <a className="btn btn-secondary" onClick={this.props.onCancel}>Отмена</a>
          &nbsp;
          <a className="btn btn-primary-outline" onClick={this.props.onSave}>Сохранить</a>
        </fieldset>
      </form>
    )
  }
}
