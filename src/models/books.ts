import client from "../database"

export type Book = {
  title: string,
  author: string,
  total_pages: number,
  category: string,
  summary: string
}

export class BookStore {
  async index() {
    try {
      const sql = 'SELECT * FROM books';
      const conn = await client.connect()
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not get all books: ${error}`)
    }
  }

  // add book to db
  async create(book: Book) {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO books (title, author, total_pages, category, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *`
      let bookValues = Object.values(book)
      const result = await conn.query(sql, bookValues)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not save book: ${error}`)
    }
  }

  // get one book
  async show(id: string) {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM books WHERE id=${id}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not get book with id ${id}: ${error}`)

    }
  }

  // delete a book
  async delete(id: string) {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM books WHERE id=${id} RETURNING *`
      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not delete book with id ${id}: ${error}`)

    }
  }

  // update a book
  async update(id: string, book: Book) {
    try {
      const conn = await client.connect()
      const sql = `UPDATE books SET title=($1), author=($2), total_pages=($3), category=($4), summary=($5) WHERE id=${id} RETURNING *`
      let bookValues = Object.values(book)
      const result = await conn.query(sql, bookValues)
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not get book with title ${book.title}: ${error}`)

    }
  }
}