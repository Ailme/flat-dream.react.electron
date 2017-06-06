"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
/*eslint-enable */
import Container from './container';
import Row from './row';
import Sidebar from './sidebar';
import Content from './content';
import Url from './url';
import util from 'util';
import {findImages, convert, translite, sanitize, getFormData} from './utils';

const tpl = "<a href=\"http://url/files/%s/%s\" target=\"_blank\">Фото%s</a>&nbsp;&nbsp;";

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      items: [],
      images: [],
      filter: "",
      folderFrom: "",
      folderTo: "",
      folderToTranslit: "",
      selectItem: null,
      selectTab: 0,
      result: []
    };
  }

  componentWillMount() {
    this.loadCategories();
  }

  loadCategories() {
    return this.fetch(Url.categories)
      .then(json => this.setState({items: json}));
  }

  fetch(url, options) {
    this.setState({isLoading: true});
    return fetch(url, options)
      .then(response => response.json())
      .then(json => {
        this.setState({isLoading: false});
        console.log(json);

        return json;
      })
      .catch(console.log.bind(console));
  }

  loadItem(id) {
    return this.fetch(Url.item(id))
      .then(json => this.setState({selectItem: json, selectTab: 1}));
  }

  saveItem(data) {
    return this.fetch(Url.save, {
      method: 'POST',
      body: data
    })
      .then(json => {
          alert(json == 0 || json == 1 ? "Сохранено" : json);
      });
  }

  sendFile(file) {
    let data = getFormData(file, this.state.folderToTranslit);

    return this.fetch(Url.upload, {
      method: 'POST',
      body: data
    })
      .then(json => file.upload = json.success);
  }

  onFilterItem(value) {
    this.setState({filter: value});
  }

  onSelectItem(value) {
    this.loadItem(value);
  }

  onSaveDescription() {
    let data = new FormData();
    data.append('id', this.state.selectItem.id);
    data.append('description', this.state.selectItem.description);

    this.saveItem(data);
  }

  onCloseDescription() {
    this.setState({selectItem: null, selectTab: 0})
  }

  onConvertFiles() {
    let images = this.state.images;
    convert(images, this.state.folderFrom, () => this.forceUpdate());
  }

  onSendFiles() {
    this.state.images.forEach(file => {
      file.loading = true;
      this.forceUpdate();

      this.sendFile(file)
        .then(() => {
          file.loading = false;
          let result = this.state.result;
          let s = util.format(tpl, this.state.folderToTranslit, file.convert.name, (result.length + 1));
          result.push(s);
          this.setState({result: result});
        });
    });
  }

  onChangeDescription(value) {
    let item = this.state.selectItem;
    item.description = value;

    this.setState({selectItem: item});
  }

  onSelectFolderFrom(folder) {
    let images = findImages(folder, () => this.forceUpdate());
    this.setState({folderFrom: folder, images: images, result: []});
  }

  onSelectFolderTo(folder) {
    this.setState({folderTo: folder, folderToTranslit: translite(sanitize(folder))});
  }

  onSelectTab(index, last) {
    this.setState({selectTab: index});
  }

  onFilter(item, index, items) {
    return item.address.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1;
  }

  render() {
    let items = this.state.items.filter(this.onFilter.bind(this));

    return (
      <Container fluid={true}>
        <Row>
          <Sidebar items={items}
                   onFilter={this.onFilterItem.bind(this)}
                   onSelect={this.onSelectItem.bind(this)}/>
          <Content isLoading={this.state.isLoading}
                   onSelectTab={this.onSelectTab.bind(this)}
                   selectedTab={this.state.selectTab}
                   onChangeDescription={this.onChangeDescription.bind(this)}
                   onSaveDescription={this.onSaveDescription.bind(this)}
                   onCloseDescription={this.onCloseDescription.bind(this)}
                   onSelectFolderFrom={this.onSelectFolderFrom.bind(this)}
                   onSelectFolderTo={this.onSelectFolderTo.bind(this)}
                   onConvertFiles={this.onConvertFiles.bind(this)}
                   onSendFiles={this.onSendFiles.bind(this)}
                   item={this.state.selectItem}
                   images={this.state.images}
                   folderFrom={this.state.folderFrom}
                   folderTo={this.state.folderTo}
                   folderToTranslit={this.state.folderToTranslit}
                   result={this.state.result}
          />
        </Row>
      </Container>
    );
  }
}
