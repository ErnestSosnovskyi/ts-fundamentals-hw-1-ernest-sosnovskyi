import type { BookId, Genre, LoanStatus } from "./types";

export class Book {
  public readonly id: BookId;
  public readonly title: string;
  public readonly author: string;
  public readonly year: number;
  public readonly genre: Genre;

  private status: LoanStatus = "available";
  private borrowedBy: string | null = null;

  // TODO: реалізуй конструктор з параметром opts
  constructor({ id, title, author, year, genre }: { id: BookId; title: string; author: string; year: number; genre: Genre }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
  }

  // TODO: методи відповідно до ТЗ
  getStatus(): LoanStatus {
    return this.status;
  }

  markBorrowed(personName: string): void {
    if (this.status === "borrowed") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }
    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned(): void {
    if (this.status === "available") {
      throw new Error("Already available");
    }
    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo(): string {
    const base = `${this.title} — ${this.author} (${this.year}), ${this.genre}`;
    if (this.status === "available") {
      return `${base} [Available]`;
    } else {
      return `${base} [Borrowed by ${this.borrowedBy}]`;
    }
  }
}
