import { createCustomer } from './functions';
import { IBook, IPerson } from './interfaces';

type PersonBook = IPerson & IBook;

type BookOrUndefined = IBook | undefined;

type BookProperties = keyof IBook;

type BookArr = ReadonlyArray<IBook>;

type BookRequiredFields = Required<IBook>;

type UpdatedBook = Partial<IBook>;

type AuthorWoEmail = Omit<IBook, 'email'>;

type СreateCustomerFunctionType = typeof createCustomer;

type fn = (p1: string, p2: number, p3: boolean) => symbol;

type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

export {
  PersonBook,
  BookOrUndefined,
  BookProperties,
  BookArr,
  BookRequiredFields,
  UpdatedBook,
  AuthorWoEmail,
  СreateCustomerFunctionType
}
