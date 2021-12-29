import Category from './enum';

interface IBook {
  id: number
  title: string
  author: string
  available: boolean
  category: Category
  pages?: number
  markDamaged?: IDamageLogger
}

interface IDamageLogger {
  (reason: string): void
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
  assistCustomer(custName: string):  void
}

interface IMagazine {
  title: string
  publisher: string
}

interface IShelfItem {
  title: string
}

interface LibMgrCallback {
  (err: Error | null, titles: Array<string> | null): void
}

interface Callback<T> {
  (err: Error, title: T): void;
}

export {
  IBook,
  IDamageLogger as ILogger,
  IPerson,
  IAuthor,
  ILibrarian,
  IMagazine,
  IShelfItem,
  LibMgrCallback,
  Callback
}
