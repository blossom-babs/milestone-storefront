import client from "../database";

export type User = {
  firstName: string,
  lastName: string,
  password: string
}

export class UserStore {
 async index():Promise<User[]>{
   try {
     const sql = `SELECT * FROM users`;
     const conn = await client.connect()
     const result = await conn.query(sql)
     conn.release()
     return result.rows
   } catch (error) {
     throw new Error(`Cannot get users. Returned with error ${error}`)
   }
 }

 async show(id:string):Promise<User>{
   try {
     const sql = `SELECT * FROM users WHERE id=${id}`
     const conn = await client.connect()
     const result = await conn.query(sql)
     conn.release()
     return result.rows[0]
   } catch (error) {
    throw new Error (`Cannot get user. Returned with error ${error}`) 
   }
 }

 async create(user: User):Promise<User>{
   try {
     const sql = `INSERT INTO users (firstName, lastName, password) VALUES  ($1) $(2) ($3)`;
     const conn = await client.connect()
     const userValues = Object.values(user)
     const result = await conn.query(sql, userValues)
     conn.release()
     return result.rows[0]
   } catch (error) {
     throw new Error(`Cannot create user. Returned with error ${error}`)
   }
 }

 async destroy(id:string):Promise<User>{
   try {
     const sql = `DELETE FROM users WHERE id=${id}`;
     const conn = await client.connect()
     const result = await conn.query(sql)
     conn.release()
     return result.rows[0]
   } catch (error) {
     throw new Error(`Cannot delte user. Returned with error ${error}`)
   }
 }

//  change password
}