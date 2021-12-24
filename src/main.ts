/* eslint-disable no-redeclare */
enum Category {
  JavaScript,
  HTML,
  CSS,
  TypeScript,
  Angular
}

type Book = {
  id: number
  title: string
  author: string
  available: boolean
  category: Category
}

type BookArr = ReadonlyArray<Book>;

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

const getBookByID = (id: number): Book => getAllBooks().find(b => b.id === id);

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

console.log(bookTitleTransform(1));
