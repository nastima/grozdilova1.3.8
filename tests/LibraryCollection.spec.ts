import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  // Тестируем метод addBook
  describe('addBook', () => {
    it('Should add a book to the collection', () => {
      const result = library.addBook('Война и мир', 'Лев Толстой');

      expect(result).toBeTypeOf('string');
      expect(library.getBooksCount()).toBe(1);
    });

    it('should return an error when adding a book with an existing title', () => {
      library.addBook('Преступление и наказание', 'Федор Достоевский');
      const result = library.addBook('Преступление и наказание', 'другой автор');

      expect(result).toBeInstanceOf(Error);
      expect(library.getBooksCount()).toBe(1);
    });

    it('should add books with different names and return different IDs', () => {
      const id1 = library.addBook('Книга1', 'Автор1') as string;
      const id2 = library.addBook('Книга2', 'Автор2');

      expect(id1).toBeTypeOf('string');
      expect(id2).toBeTypeOf('string');

      expect(id1).not.toBe(id2);

      expect(library.getBooksCount()).toBe(2);
    });
  });

  // Тестируем метод removeBook
  describe('removeBook', () => {
    it('should delete the book by ID', () => {
      const id = library.addBook('1984', 'ДЖордж Оруэлл') as string;

      library.removeBook(id);

      expect(library.getBooksCount()).toBe(0);
      expect(library.getBookInfo(id)).toBeNull;
    });

    it('should not throw error when deleting a non-existent book', () => {
      expect(()=> {
        library.removeBook('несуществующий id');
      }).not.toThrow();

      expect(library.getBooksCount()).toBe(0);
    });
  });

  // Тестируем метод getBookInfo
  describe('getBookInfo', () => {
    it('should return correct information about the book', () => {
      const id = library.addBook('Мастер и Маргарита', 'Михаил Булгаков') as string;
      const bookInfo = library.getBookInfo(id);

      expect(bookInfo).toEqual({
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков'
      });
    });

    it('should return null for non-existent book', () => {
      const bookInfo = library.getBookInfo('несуществующий id');

      expect(bookInfo).toBeNull();
    });
  });

  // Тестируем метод getAllBooks
  describe('getAllBooks', () => {
    it('should return empty array for empty collection', () => {
      const books = library.getAllBooks();

      expect(books).toEqual([]);
    });

    it('should return all books with their ID', () => {
      const id1 = library.addBook('Книга1', 'Автор1') as string;
      const id2 = library.addBook('Книга2', 'Автор2') as string;

      const books = library.getAllBooks();

      expect(books).toHaveLength(2);
      expect(books).toEqual([
        { id: id1, title: 'Книга1', author: 'Автор1' },
        { id: id2, title: 'Книга2', author: 'Автор2' }
      ]);
    });
  });

  // Тестируем метод getBooksCount
  describe('getBooksCount', () => {
    it('should return 0 for empty collection', () => {
      expect(library.getBooksCount()).toBe(0);
    });

    it('should return the correct number of books when adding and removing', () => {
      library.addBook('Книга1', 'Автор1');
      library.addBook('Книга2', 'Автор2');

      expect(library.getBooksCount()).toBe(2);

      const id = library.addBook('Книга3', 'Автор3') as string;

      expect(library.getBooksCount()).toBe(3);

      library.removeBook(id);

      expect(library.getBooksCount()).toBe(2);
    });
  });
});
