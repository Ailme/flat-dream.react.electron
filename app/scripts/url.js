'use strict';

export default class Description {
  static index = 'http://url/cms/cmd.php';
  static categories = `${Description.index}?command=getCategories`;
  static save = `${Description.index}?command=saveItem`;
  static upload = `${Description.index}?command=fileUpload`;
  static item = (id) => `${Description.index}?command=getItem&id=${id}`;
}
