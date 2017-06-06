"use strict";

/*eslint-disable */
import React, {PropTypes} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
/*eslint-enable */
import Loader from './loader';
import Files from '../files';
import Title from './title';
import Description from './description';
import Col from '../col';

export default class Content extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    selectedTab: PropTypes.number,
    item: PropTypes.object,
    images: PropTypes.array,
    result: PropTypes.array,
    folderFrom: PropTypes.string,
    folderTo: PropTypes.string,
    folderToTranslit: PropTypes.string,
    onSelectTab: PropTypes.func,
    onSelectFolderFrom: PropTypes.func,
    onSelectFolderTo: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onSaveDescription: PropTypes.func,
    onCloseDescription: PropTypes.func,
    onConvertFiles: PropTypes.func,
    onSendFiles: PropTypes.func
  };
  static defaultProps = {
    isLoading: false,
    item: null,
    images: [],
    selectedTab: 0
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Col className="content" sm={8} md={8} smOffset={4} mdOffset={4}>
        <Tabs onSelect={this.props.onSelectTab} selectedIndex={this.props.selectedTab}>
          <TabList>
            <Tab>
              <Loader show={this.props.isLoading}/>
              Файлы
            </Tab>
            {!this.props.item ? null : <Tab>Описание</Tab>}
          </TabList>

          <TabPanel>
            <Files onSelectFolderFrom={this.props.onSelectFolderFrom}
                   onSelectFolderTo={this.props.onSelectFolderTo}
                   onConvertFiles={this.props.onConvertFiles}
                   onSendFiles={this.props.onSendFiles}
                   folderFrom={this.props.folderFrom}
                   folderTo={this.props.folderTo}
                   folderToTranslit={this.props.folderToTranslit}
                   images={this.props.images}
                   result={this.props.result}
            />
          </TabPanel>

              {!this.props.item ? null :
                <TabPanel>
                  <Title text={this.props.item.address}/>
                  <Description value={this.props.item.description}
                               onChange={this.props.onChangeDescription}
                               onSave={this.props.onSaveDescription}
                               onCancel={this.props.onCloseDescription}/>
                </TabPanel>
              }
        </Tabs>
      </Col>
    )
  }
}
