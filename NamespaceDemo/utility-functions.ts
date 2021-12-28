namespace Utility {
  export namespace Fees {
    export const calculateLateFee = (daysLate: number) => daysLate * 0.25;
  }

  export const maxBooksAllowed = (age: number) => age < 12 ? 3 : 10;

  const privateFunc = () => console.log('This is private function');
}