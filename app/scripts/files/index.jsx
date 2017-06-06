"use strict";

/*eslint-disable */
const {dialog} = require('electron').remote;
import React, {PropTypes} from 'react';
import ClassNames from 'classnames';
/*eslint-enable */
import Col from '../col'
import Table from './table'

export default class Files extends React.Component {
  static propTypes = {
    folderFrom: PropTypes.string,
    folderTo: PropTypes.string,
    folderToTranslit: PropTypes.string,
    images: PropTypes.array,
    result: PropTypes.array,
    onSelectFolderFrom: PropTypes.func,
    onSelectFolderTo: PropTypes.func,
    onConvertFiles: PropTypes.func,
    onSendFiles: PropTypes.func
  };
  static defaultProps = {
    images: []
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  onChangeFolderFrom(event) {
    this.props.onSelectFolderFrom(event.target.value)
  }

  onChangeFolderTo(event) {
    this.props.onSelectFolderTo(event.target.value)
  }

  onSelectFolder(event) {
    let folder = dialog.showOpenDialog({properties: ['openDirectory']});
    if (folder) this.props.onSelectFolderFrom(folder[0]);
  }

  render() {
    return (
      <form>
        <fieldset className="form-group row">
          <Col sm={4}>
            <div className="input-group">
              <input type="text" className="form-control" ref="folderFrom" placeholder="Каталог с фото..."
                     value={this.props.folderFrom} onChange={this.onChangeFolderFrom.bind(this)}/>
              <a className="btn btn-secondary input-group-addon"
                 onClick={this.onSelectFolder.bind(this)}>Выбрать...</a>
            </div>
          </Col>
          <Col sm={4}>
            <input type="text" className="form-control" ref="folderTo" placeholder="Куда сохранять..."
                   value={this.props.folderTo} onChange={this.onChangeFolderTo.bind(this)}/>
            <small className="text-muted">{this.props.folderToTranslit}</small>
          </Col>
          <Col sm={4}>
            <a className={ClassNames("btn btn-info-outline", {'disabled': !this.props.images.length})}
               onClick={this.props.onConvertFiles} disabled={!this.props.images.length}>Конвертировать</a>
            &nbsp;
            <a className={ClassNames("btn btn-primary-outline", {'disabled': !this.props.folderTo.length})}
               onClick={this.props.onSendFiles}
               disabled={!this.props.folderTo.length}>Отправить</a>
          </Col>
        </fieldset>
        <fieldset className="form-group">
          <textarea className="form-control" value={this.props.result.join("\r\n")} rows="10"/>
        </fieldset>
        <fieldset className="form-group">
          <Table items={this.props.images}/>
        </fieldset>
      </form>
    )
  }
}
