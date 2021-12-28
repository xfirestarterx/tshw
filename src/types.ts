import { IBook, IPerson } from './interfaces';

type PersonBook = IPerson & IBook;

type BookOrUndefined = IBook | undefined;

type BookProperties = keyof IBook;

type BookArr = ReadonlyArray<IBook>;

export {
  PersonBook,
  BookOrUndefined,
  BookProperties,
  BookArr
}
