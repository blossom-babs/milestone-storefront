import Client from "../database"

export type Book = {
  title: string,
  author: string,
  total_pages: number,
  category: string,
  summary: string
}

export class BooksTable {
  async index() {
    try {      
      const conn = await Client.connect()
      const sqlRequest = 'SELECT * FROM books';
      const response = await conn.query(sqlRequest)
      conn.release()
      return response.rows
    } catch (error) {
      throw new Error(`Cannot get error ${error}`)
    }
  }
}