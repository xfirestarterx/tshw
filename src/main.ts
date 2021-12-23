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

const logFirstAvailable = (books: BookArr) => {
  const firstAvailable = books.find(b => b.available === true);
  console.log(`qty: ${ books.length }, first available: ${ firstAvailable.title }`)
}

logFirstAvailable(getAllBooks());

const getBookTitlesByCategory = (cat: Category): Array<string> => {
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
