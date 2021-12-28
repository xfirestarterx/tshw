import { IShelfItem } from "../interfaces";

export default class Shelf<T extends IShelfItem> {
  items: Array<T>;

  constructor(items: Array<T>) {
    this.items = items;
  }

  add(item: T) {
    this.items.push(item);
  }

  getFirst(): T {
    return this.items.shift();
  }

  find(title: string): T {
    return this.items.find(i => i.title === title);
  }

  printTitles() {
    let titles = [];
    this.items.forEach(i => titles.push(i.title));
    console.log(titles.join(','));
  }
}