import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';
import * as Interfaces from '../interfaces';

// @logger
// @sealed('UniversityLibrarian')
export class UniversityLibrarian implements Interfaces.ILibrarian {
  @format() name: string;

  constructor (public department: string, name: string, public email: string) {}

  @logMethod
  assistCustomer(@logParameter custName: string) {
    console.log(`${ this.name } assists ${ custName }`);
  }

  // @writable(true)
  assistFaculty() {
    console.log('assist faculty')
  }

  // @writable(false)
  teachCommunity() {
    console.log('teaching')
  }
}
