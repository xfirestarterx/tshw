import { ReferenceItem } from "./referenceItem";

export default class Encyclopedia extends ReferenceItem {
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