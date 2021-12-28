import { timeout } from "../decorators";

// parcel unable to compile abstract class with mehtod decorator
export class ReferenceItem {
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

  // @timeout(5000)
  printItem() {
    console.log(`${ this.title } was published in ${ this.year } year, department is ${ ReferenceItem.dept }`);
  }

  getID() {
    return this.#id;
  }

  // printCitation(): void;
}