export abstract class ReferenceItem {
  // title: string;
  // year: number;
  private _publisher: string;
  #id: number;
  static dept = 'some dept';

  constructor(public title: string, protected year: number, id: number)
  {
    this.#id = id;
  }

  get publisher() {
    return this._publisher.toUpperCase();
  }

  set publisher(val: string) {
    this._publisher = val;
  }

  printItem() {
    console.log(`${ this.title } was published in ${ this.year } year, department is ${ ReferenceItem.dept }`);
  }

  getID() {
    return this.#id;
  }

  abstract printCitation(): void;
}