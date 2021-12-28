import * as Interfaces from '../interfaces';

export class UniversityLibrarian implements Interfaces.ILibrarian {
  constructor (public department: string, public name: string, public email: string) {}

  assistCustomer(custName: string) {
    console.log(`${ this.name } assists ${ custName }`);
  }
}
