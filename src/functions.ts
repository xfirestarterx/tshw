import { BookArr, BookOrUndefined, BookProperties } from "./types";
import Category from './enum';
import { IBook, ILogger } from "./interfaces";
import RefBook from './classes/encyclopedia';

export const getAllBooks = (): BookArr => {
  const books: BookArr = <const>[
    { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
    { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
  ];

  return books;
}

export const logFirstAvailable = (books: BookArr = getAllBooks()) => {
  const firstAvailable = books.find(b => b.available === true);
  console.log(`qty: ${ books.length }, first available: ${ firstAvailable.title }`)
}

export const getBookTitlesByCategory = (cat: Category = Category.JavaScript): Array<string> => {
  return getAllBooks()
    .filter(({ category }) => category === cat)
    .map(({ title }) => title);
}

export const logBookTitles = (titles: Array<string>): void =>
  console.log(`titles: ${ titles.join(', ') }`);

export const getBookAuthorByIndex = (idx: number): [author: string, title: string] => {
  const book = getAllBooks()[idx];
  return [book.author, book.title];
}

export const calcTotalPages = (): bigint => {
  const data = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
  ];

  let res: bigint = BigInt(0);
  data.forEach(el => {
    res += BigInt(el.books * el.avgPagesPerBook);
  });

  return res;
}

export const createCutomerID = (name: string, id: number): string => `${ name }${ id }`;

export const myID = createCutomerID('Ann', 10);
console.log(myID);

export const idGenerator: (name: string, id: number) => string = createCutomerID;

export const createCustomer = (name: string, age?: number, city?: string) => {
  console.log(`${ name } ${ age ?? '' } ${ city ?? '' }`);
}

export const getBookByID = (id: number): BookOrUndefined => getAllBooks().find(b => b.id === id);

export const checkoutBooks = (customer: string, ...bookIDs: Array<number>): Array<string> => {
  console.log(customer);
  const res = [];
  bookIDs.forEach(id => res.push(getBookByID(id).title));
  return res;
}

export function getTitles(author: string): Array<string>;
export function getTitles(available: boolean): Array<string>;
export function getTitles(id: number, available: boolean): Array<string>;
export function getTitles(...args: Array<any>): Array<string> {
  const books = getAllBooks();

  if (args.length > 1) {
    const [ id, available ] = args;
    return books.filter(b => b.id === id && b.available == available)
    .map(b => b.title);
  }

  if (typeof args[0] === 'string') {
    return books
      .filter(b => b.author === args[0])
      .map(b => b.title);
  } else if (typeof args[0] === 'boolean') {
    return books
      .filter(b => b.available === args[0])
      .map(b => b.title);
  }
}

export function assertStringValue (val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('value shoud have been a string');
  }
}

export function assertRefBookInstance (condition: any): asserts condition {
  if (!condition) {
    throw new Error('It is not instance of RefBook');
  }
}

export const printRefBook = (data: any) => {
  assertRefBookInstance(data);

  if (data instanceof RefBook) {
    data.printItem();
  }
}

export const bookTitleTransform = (title: any) => {
  assertStringValue(title);

  return [...title].reverse().join('');
}

export const printBook = (book: IBook) => console.log(`${ book.title } ${ book.author }`);

export const logDamage: ILogger = (reason: string) => {
  console.log(`Damaged: ${ reason }`)
}

export const getProperty = (book: IBook, propName: BookProperties | 'isbn'): any => {
  const res = book[propName];
  if (res instanceof Function) {
    return propName;
  }
  
  return res;
}