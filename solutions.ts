export function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((n) => n % 2 === 0);
}

export function reverseString(text: string): string {
  return text.split("").reverse().join("");
}

export type StringOrNumber = string | number;

export function checkType(value: StringOrNumber): "String" | "Number" {
  if (typeof value === "string") {
    return "String";
  }
  return "Number";
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

export type BookWithReadStatus = Book & { isRead: boolean };

export function toggleReadStatus(book: Book): BookWithReadStatus {
  return { ...book, isRead: true };
}

export class Person {
  constructor(
    public name: string,
    public age: number
  ) {}
}

export class Student extends Person {
  constructor(
    name: string,
    age: number,
    public grade: string
  ) {
    super(name, age);
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

export function getIntersection(first: number[], second: number[]): number[] {
  const secondSet = new Set(second);
  return first.filter((value) => secondSet.has(value));
}
