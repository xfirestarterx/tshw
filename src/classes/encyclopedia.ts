import { positiveInteger } from "../decorators";
import { ReferenceItem } from "./referenceItem";

export default class Encyclopedia extends ReferenceItem {
  private _copies: number;

  get copies(): number {
    return this._copies;
  }

  @positiveInteger
  set copies(val) {
    this._copies = val;
  }

  constructor(title: string, year: number, id: number, public edition: number) {
    super(title, year, id);
  }

  printItem() {
    super.printItem();
    console.log(`edition: ${ this.edition } (${ this.year })`);
  }

  printCitation() {
    console.log(`${ this.title } - ${ this.year }`);
  }
}