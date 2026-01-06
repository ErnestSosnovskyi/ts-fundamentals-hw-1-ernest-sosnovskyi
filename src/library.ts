import { Book } from "./book";
import type { BookId } from "./types";

export class Library {
  // TODO: реалізуй колекцію книжок (Map або іншу структуру)
  private books: Map<BookId, Book> = new Map();

  add(item: Book) {
    if (this.books.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.books.set(item.id, item);
  }

  remove(id: BookId) {
    const book = this.getBookOrThrow(id);
    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }
    this.books.delete(id);
  }

  listAll(): Book[] {
    return Array.from(this.books.values());
  }

  listAvailable(): Book[] {
    return this.listAll().filter(book => book.getStatus() === "available");
  }

  borrow(bookId: BookId, personName: string): void {
    const book = this.getBookOrThrow(bookId);
    book.markBorrowed(personName);
  }

  return(bookId: BookId): void {
    const book = this.getBookOrThrow(bookId);
    book.markReturned();
  }

  private getBookOrThrow(id: BookId): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }
}
