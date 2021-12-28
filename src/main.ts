/* eslint-disable no-redeclare */
import { UniversityLibrarian } from './classes';
import Category from './enum';
import {
  bookTitleTransform,
  calcTotalPages,
  checkoutBooks,
  createCustomer,
  getAllBooks,
  getBookAuthorByIndex,
  getBookByID,
  getBookTitlesByCategory,
  getProperty,
  getTitles,
  idGenerator,
  logBookTitles,
  logDamage,
  logFirstAvailable,
  printBook,
  printRefBook,
  purge
} from './functions';
import { IAuthor, IBook, ILibrarian, IMagazine } from './interfaces';
import { PersonBook, UpdatedBook } from './types';
import RefBook from './classes/encyclopedia';
import { Shelf } from './classes';
import type { Library } from './classes';
import { BookRequiredFields, СreateCustomerFunctionType } from './types';
import Encyclopedia from './classes/encyclopedia';

const flag = true;
// not sure, but it seems that parcel doesn't support TLA currently
(async () => {
  if (flag) {
    const classes = await import('./classes');
    const reader = new classes.Reader();
    console.log(reader)
  }
})();

logFirstAvailable(getAllBooks());

logBookTitles(getBookTitlesByCategory(Category.JavaScript));

console.log(getBookAuthorByIndex(2));

console.log(calcTotalPages())

console.log(idGenerator('Ann2', 20));

createCustomer('Ann');
createCustomer('Ann', 20);
createCustomer('Ann', 20, 'Beirut');

getBookTitlesByCategory();

logFirstAvailable();

console.log(getBookByID(1));

const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

console.log(bookTitleTransform('Refactoring JavaScript'));

// console.log(bookTitleTransform(1));

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

console.log(getProperty(myBook, 'title'));

console.log(getProperty(myBook, 'markDamaged'));

console.log(getProperty(myBook, 'isbn'));


// 05.01

// const ref = new ReferenceItem('some title', 2021, 1);
// ref.publisher = 'some publisher';
// console.log(ref.publisher);
// console.log(ref, ref.getID());

const refBook = new RefBook('enc title', 2020, 2, 3);
refBook.printItem();
refBook.printCitation();

// 05.04

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

printRefBook(refBook);

const librarian2 = new UniversityLibrarian('dept', 'name', 'email');

printRefBook(librarian2);

// const lib: Library = new Library();
const lib: Library = {
  address: 'lib address',
  id: 1,
  name: 'lib name'
}

console.log(lib);

const inventory = [
  { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
  { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
  { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
  { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
  ];

// console.log(purge(inventory));
// console.log(purge([1,2,3]))

const bookShelf = new Shelf(inventory);
console.log(bookShelf.getFirst().title);

const magazines: Array<IMagazine> = [
  { title: 'Programming Language Monthly', publisher: 'Code Mags' },
  { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
  { title: 'Five Points', publisher: 'GSU' }
  ];

const magazineShelf = new Shelf(magazines);
console.log(magazineShelf.getFirst().title);
magazineShelf.printTitles();

const fivePoints = magazineShelf.find('Five Points');
console.log(fivePoints)

console.log(getProperty(getAllBooks()[0], 'title'));

const b: BookRequiredFields = {
  author: 'b author',
  available: true,
  category: Category.TypeScript,
  id: 1,
  markDamaged: () => {},
  pages: 200,
  title: 'b title'
}

const u: UpdatedBook = {
  title: 'u title'
}

const params: Parameters<СreateCustomerFunctionType> = ['cust name'];

createCustomer(...params);

const u2 = new UniversityLibrarian('dept', 'name', 'email');

// const fLibrarian = new UniversityLibrarian('dept', 'anna', 'email');
// fLibrarian.printLibrarian();

const u3 = new UniversityLibrarian('dept', 'name', 'email');

console.log(u3)
// u3.assistCustomer('name');
u3.name = 'Boris';
u3.assistCustomer('anna');

const e = new Encyclopedia('title', 2000, 2, 2);
// e.copies = -1;
e.copies = 100;
