type BookInfo = { id: string; title: string; author: string };

export class LibraryCollection {
  private books: Map<string, {title: string; author: string}>;

  constructor() {
      this.books = new Map();
  }

  /**Добавляет книгу в коллекцию*/
  addBook(title: string, author: string): string | Error {
      for (const [_, book] of this.books) {
          if (book.title === title) {
              return new Error('Книга с таким названием уже существует');
          }
      }

    const id =  this.generateId();
    this.books.set(id, {title, author});
    return id;
  }
  /**Удаляет книгу из коллекции по ID*/
  removeBook(id: string): void {
      this.books.delete(id);
  }

  /**Возвращает информацию о книге по ID*/
  getBookInfo(id: string): { title: string; author: string} | null {
      const book = this.books.get(id);
      return book ? { ...book } : null;
  }

  /**Возвращает список всех книг в коллекции*/
  getAllBooks(): Array<{id: string; title: string; author: string}> {
      const result: Array<{id: string; title: string;author: string}> = [];
      this.books.forEach((book, id) => {
          result.push({id, ...book});
      });
      return result;
  }

  /**Возвращает количество книг в коллекции*/
  getBooksCount(): number {
      return this.books.size;
  }

  /**Приватный метод для генерации уникального ID*/
  private generateId(): string {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
