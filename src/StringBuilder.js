import { isNumeric, isNullOrUndefined } from "@locustjs/base";

class StringBuilder {
  constructor(bufferSize) {
    this.bufferSize = isNumeric(bufferSize) ? parseInt(bufferSize) || 32 : 32;

    if (isNaN(this.bufferSize)) {
      this.bufferSize = 32;
    }

    this.clear();
  }
  clear() {
    this._buffer = new Array(this.bufferSize);
    this._last = 0;
    this._length = 0;
  }
  append(x) {
    const item = (x || "").toString();
    this._buffer[this._last] = item;
    this._length += item.length;
    this._last++;

    if (this._last == this.bufferSize) {
      this._buffer.splice(this.bufferSize, ...new Array(this.bufferSize));
    }

    return this._last - 1;
  }
  appendAt(index, x) {
    if (index < 0 || index > this._last) {
      throw `index ${index} is out of range`;
    }

    const item = (x || "").toString();
    this._buffer.splice(index, 0, item);
    this._length += item.length;
    this._last++;

    if (this._last == this.bufferSize) {
      this._buffer.splice(this.bufferSize, ...new Array(this.bufferSize));
    }

    return this._last - 1;
  }
  replaceAt(index, x) {
    if (index < 0 || index >= this._last) {
      throw `index ${index} is out of range`;
    }

    const prev = this._buffer[index];
    const item = (x || "").toString();
    this._buffer[index] = item;
    this._length += item.length - prev.length;
  }
  itemAt(index) {
    if (index < 0 || index >= this._last) {
      throw `index ${index} is out of range`;
    }

    const item = this._buffer[index];

    return item;
  }
  removeAt(index, count = 1) {
    if (index < 0 || index >= this._last) {
      throw `index ${index} is out of range`;
    }

    if (count < 0) {
      throw `count should be greater than 0`;
    }

    if (index + count > this._last) {
      throw `exceeding count. cannot remove ${count} items from internal buffer`;
    }

    const items = this._buffer.splice(index, count);
    this._length -= items.join("").length;
    this._last -= count;
  }
  get length() {
    return this._length;
  }
  get count() {
    return this._last;
  }
  toString() {
    const result = this._buffer.join("");

    this.clear();

    return result;
  }
  checkRange(from, to) {
    if (isNullOrUndefined(from)) {
      from = 0;
    }
    if (isNullOrUndefined(to)) {
      to = this._last;
    }

    let reverse = false;

    if (from > to) {
      const temp = from;
      from = to;
      to = temp;
      reverse = true;
    }

    if (from < 0 || from >= this._last) {
      throw `from index (${from}) is out of range`;
    }

    if (to < 0 || to > this._last) {
      throw `to index (${to}) is out of range`;
    }

    return { from, to, reverse };
  }
  getRange(from, to) {
    const { from: _from, to: _to, reverse } = this.checkRange(from, to);

    let arr = this._buffer.filter((x, i) => i >= _from && i < _to);

    if (reverse) {
      arr = arr.reverse();
    }

    return arr;
  }
  getString(from, to) {
    const arr = this.getRange(from, to);
    const result = arr.join("");

    return result;
  }
  toLower(from, to) {
    const { from: _from, to: _to } = this.checkRange(from, to);

    for (let i = _from; i < _to; i++) {
      this._buffer[i] = this._buffer[i].toLowerCase();
    }
  }
  toUpper(from, to) {
    const { from: _from, to: _to } = this.checkRange(from, to);

    for (let i = _from; i < _to; i++) {
      this._buffer[i] = this._buffer[i].toUpperCase();
    }
  }
  trim(from, to) {
    const { from: _from, to: _to } = this.checkRange(from, to);

    for (let i = _from; i < _to; i++) {
      this._buffer[i] = this._buffer[i].trim();
    }
  }
}

export default StringBuilder;
