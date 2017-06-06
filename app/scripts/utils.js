'use strict';

import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import gm from 'gm';

function trim(str, chars) {
  return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function sanitizeFile(name) {
  let ext = path.extname(name).toLowerCase();
  name = name.slice(0, name.length - ext.length);

  return sanitize(name) + ext;
}

function sanitize(value) {
  value = value.toLowerCase();
  value = value.replace(/[^a-zа-яёЁ0-9-_\s]/ig, '')
    .replace(/[\s-]/ig, '_')
    .replace(/_+/ig, '_');

  return trim(value, '_');
}

function translite(str) {
  let arr = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'g',
    'з': 'z',
    'и': 'i',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'ch',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shh',
    'ъ': '',
    'ь': '',
    'ы': 'y',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
    'А': 'A',
    'Б': 'B',
    'В': 'V',
    'Г': 'G',
    'Д': 'D',
    'Е': 'E',
    'Ё': 'YO',
    'Ж': 'G',
    'З': 'Z',
    'И': 'I',
    'Й': 'Y',
    'К': 'K',
    'Л': 'L',
    'М': 'M',
    'Н': 'N',
    'О': 'O',
    'П': 'P',
    'Р': 'R',
    'С': 'S',
    'Т': 'T',
    'У': 'U',
    'Ф': 'F',
    'Х': 'CH',
    'Ц': 'C',
    'Ч': 'CH',
    'Ш': 'SH',
    'Щ': 'SHH',
    'Ъ': '',
    'Ь': '',
    'Ы': 'y',
    'Ю': 'YU',
    'Я': 'YA',
    'Э': 'E',
    '#': '',
    ' ': '-'
  };

  return str.replace(/./g, (a) => arr[a] !== void 0 ? arr[a] : a);
}

function findImages(folder, cb) {
  let files = fs
    .readdirSync(folder)
    .filter(file => {
      let ext = path.extname(file).toLowerCase();
      return (file.indexOf('.') !== 0) && ['.jpg', '.jpeg', '.bmp', '.gif', '.png'].indexOf(ext) > -1;
    })
    .map((name) => {
      let filePath = path.join(folder, name);
      let stats = fs.statSync(filePath);

      let file = {
        name: name,
        path: filePath,
        url: path.join('file://', filePath),
        ext: path.extname(name).toLowerCase(),
        size: (stats.size / 1024).toFixed(2) + ' kB',
        convert: {},
        loading: true,
        upload: null
      };

      gm(file.path).size((err, size) => {
        file = Object.assign(file, size);
        file.loading = false;

        cb(file);
      });

      return file;
    });

  return files;
}

function convert(files, filePath, cb) {
  let tmpPath = path.join(filePath, 'tmp');

  rimraf.sync(tmpPath, {glob: true}, console.log.bind(console));
  fs.mkdirSync(tmpPath, console.log.bind(console));

  files.map((file) => {
    file.loading = true;
    file.convert.name = translite(sanitizeFile(file.name));
    file.convert.path = path.join(tmpPath, file.convert.name);

    let w = file.width > file.height ? null : 768;
    let h = file.width > file.height ? 768 : null;

    gm(file.path)
      .resize(w, h)
      .noProfile()
      .write(file.convert.path, (err) => {
        fs.stat(file.convert.path, (err, stats) => {
          file.convert.size = (stats.size / 1024).toFixed(2) + ' kB';
        });


        gm(file.convert.path).size((err, size) => {
          file.convert = Object.assign(file.convert, size);
          file.loading = false;
          cb(file);
        });
      });
  });
}

function getFormData(file, folder) {
  let data = new FormData();
  data.append('folder', folder);
  data.append('replace', 1);
  data.append('newName', file.convert.name);
  data.append('file', new Blob([fs.readFileSync(file.convert.path)]), file.convert.name);

  return data;
}

export {sanitize, sanitizeFile, translite, trim, ltrim, findImages, convert, getFormData};
