import { IBook } from "../interfaces";

export class Reader {
  name: string;
  books: Array<IBook> = [];

  take(book: IBook) {
    this.books.push(book);
  }
}
