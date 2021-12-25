/* eslint-disable no-redeclare */
enum Category {
  JavaScript,
  HTML,
  CSS,
  TypeScript,
  Angular
}

interface IPerson {
  name: string
  email: string
}

interface IAuthor extends IPerson {
  numBooksPublished: number
}

interface ILibrarian extends IPerson {
  department: string
  assistCustomer(custName: string) : void
}

interface IDamageLogger {
  (reason: string): void
}

interface IBook {
  id: number
  title: string
  author: string
  available: boolean
  category: Category
  pages?: number
  markDamaged?: IDamageLogger;
}

type PersonBook = IPerson & IBook;

type BookOrUndefined = IBook | undefined;

type BookProperties = keyof IBook;

type BookArr = ReadonlyArray<IBook>;

const getAllBooks = (): BookArr => {
  const books: BookArr = <const>[
    { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
    { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
  ];

  return books;
}

const logFirstAvailable = (books: BookArr = getAllBooks()) => {
  const firstAvailable = books.find(b => b.available === true);
  console.log(`qty: ${ books.length }, first available: ${ firstAvailable.title }`)
}

logFirstAvailable(getAllBooks());

const getBookTitlesByCategory = (cat: Category = Category.JavaScript): Array<string> => {
  return getAllBooks()
    .filter(({ category }) => category === cat)
    .map(({ title }) => title);
}

const logBookTitles = (titles: Array<string>): void =>
  console.log(`titles: ${ titles.join(', ') }`);

logBookTitles(getBookTitlesByCategory(Category.JavaScript));

const getBookAuthorByIndex = (idx: number): [author: string, title: string] => {
  const book = getAllBooks()[idx];
  return [book.author, book.title];
}

console.log(getBookAuthorByIndex(2));

const calcTotalPages = (): bigint => {
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

console.log(calcTotalPages())


// 03.01
const createCutomerID = (name: string, id: number): string => `${ name }${ id }`;

const myID = createCutomerID('Ann', 10);
console.log(myID);

const idGenerator: (name: string, id: number) => string = createCutomerID;

console.log(idGenerator('Ann2', 20));


// 03.02
const createCustomer = (name: string, age?: number, city?: string) => {
  console.log(`${ name } ${ age ?? '' } ${ city ?? '' }`);
}

createCustomer('Ann');
createCustomer('Ann', 20);
createCustomer('Ann', 20, 'Beirut');

getBookTitlesByCategory();

logFirstAvailable();

const getBookByID = (id: number): BookOrUndefined => getAllBooks().find(b => b.id === id);

console.log(getBookByID(1));

const checkoutBooks = (customer: string, ...bookIDs: Array<number>): Array<string> => {
  console.log(customer);
  const res = [];
  bookIDs.forEach(id => res.push(getBookByID(id).title));
  return res;
}

const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);


// 03.03
function getTitles(author: string): Array<string>;
function getTitles(available: boolean): Array<string>;
function getTitles(id: number, available: boolean): Array<string>;
function getTitles(...args: Array<any>): Array<string> {
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

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);


// 03.04
function assertStringValue (val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('value shoud have been a string');
  }
}

const bookTitleTransform = (title: any) => {
  assertStringValue(title);

  return [...title].reverse().join('');
}

console.log(bookTitleTransform('Refactoring JavaScript'));

// console.log(bookTitleTransform(1));


// 04.01
const printBook = (book: IBook) => console.log(`${ book.title } ${ book.author }`);

const myBook: IBook = {
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  pages: 200,
  markDamaged: (reason: string) => console.log(`Damaged: ${ reason }`)
}

printBook(myBook);

myBook.markDamaged('missing back cover');


// 04.02
const logDamage: IDamageLogger = (reason: string) => {
  console.log(`Damaged: ${ reason }`)
}

logDamage('some reason');

// 04.03
const favoriteAuthor: IAuthor = {
  email: 'author email',
  name: 'author name',
  numBooksPublished: 5
}

const favoriteLibrarian: ILibrarian = {
  department: 'librarian dept',
  email: 'librarian email',
  name: 'librarian name',
  assistCustomer: (custName: string) => {
    console.log(custName);
  }
}


// 04.04
const offer: any = {
  book: {
    title: 'Essential TypeScript'
  }
}

console.log(
  offer.magazine,
  offer.magazine?.getTitle?.(),
  offer.book?.getTitle?.(),
  offer.book?.authors?.[0]
);


// 04.05
const getProperty = (book: IBook, propName: BookProperties | 'isbn'): any => {
  const res = book[propName];
  if (res instanceof Function) {
    return propName;
  }
  
  return res;
}

console.log(getProperty(myBook, 'title'));

console.log(getProperty(myBook, 'markDamaged'));

console.log(getProperty(myBook, 'isbn'));


// 05.01
abstract class ReferenceItem {
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

// const ref = new ReferenceItem('some title', 2021, 1);
// ref.publisher = 'some publisher';
// console.log(ref.publisher);
// console.log(ref, ref.getID());


// 05.02
class Encyclopedia extends ReferenceItem {
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

const refBook = new Encyclopedia('enc title', 2020, 2, 3);
refBook.printItem();
refBook.printCitation();

// 05.04
class UniversityLibrarian implements ILibrarian {
  constructor (public department: string, public name: string, public email: string) {}

  assistCustomer(custName: string) {
    console.log(`${ this.name } assists ${ custName }`);
  }
}

const favoriteLibrarian2: ILibrarian = new UniversityLibrarian('some dept', 'some name', 'some email');
favoriteLibrarian2.assistCustomer('cust name');

// 05.05
const personBook: PersonBook = {
  author: 'person book author',
  available: true,
  category: Category.Angular,
  email: 'person book email',
  id: 1,
  name: 'person book name',
  title: 'person book title',
}

console.log(personBook);

