# A simple book API

A-simple-book-API allows you to GET books from a library database, POST a new book to the database, PUT(edit) any book in the database, and lastly DELETE

## Bootstrapped with
1. [PostgreSQL](https://www.postgresql.org/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Node](https://nodejs.org/en/)
4. [ExpressJs](https://expressjs.com/)
5. [eslint linter](https://eslint.org/)
6. [Prettier code formatter](https://prettier.io/)

## Getting started
```
$ git clone https://github.com/blossom-babs/exercise-setup-postgresql-in-node-env/tree/books-crud-actions
$ cd exercise-setup-postgresql-in-node-env
$ npm install
$ npm run watch
```
If you want to contribute, before any of the steps above, you would need to __fork__ this project first.
You're ready to hack (and | or contribute) ✌️

## Endpoints
1. GET /books
> returns an array of the books object in the database
2. POST /books
> saves new book to the database and returns the book object
> Request should be made in the format below👇
```
{
  "title": "mas querido",
  "author": "Blossom Babalola",
  "total_pages": 400,
  "category": "non-fiction, auto-biography",
  "summary": "An auto-biography of a life lived for Christ"
}
```
3. PUT /books/:id
> Edit the details of the book with requested id. Note: put is used, not patch, therefore the query expects the entire book object 
4. DELETE /students/:id
> deletes the book with the requested id from the database. Returns same book object
5. GET /students/:id
> returns an object of the book that matches the requested id


## 🤝 Contributing
Contributions, issues and feature requests are welcome!

## Authors
🌸 __Blossom__
- Github: [@blossom-babs](https://github.com/blossom-babs/)
- LinkedIn: [Blossom Babalola](https://www.linkedin.com/in/blossom-babalola/)
- Twitter: [@BlossomBabalola](https://twitter.com/BlossomBabalola)

### Show your support
- Give a ⭐ if you like this project
- [Buy me a coffee](https://www.buymeacoffee.com/blossombabs)