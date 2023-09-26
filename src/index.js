const { gql, ApolloServer } = require('apollo-server');


// CREATE FAKE DATABASE

let books = [];

// DEFINE TYPES

const typeDefs = gql`
    type Book {
        id: ID!
        title: String
        author: String
        publishedAt: Int
    
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }

    type Mutation {
        create(id: ID!, title: String!, Author: String!, publishedAt: Int!): Book
        delete(id: ID!): Boolean
        update(id: ID!, title: String, Author: String, publishedAt: Int): Book
    }
`;

// DEFINE RESOLVERS

const resolvers = {
    Query: {
        books: () => {
            return books
        },
        book: (_, {id}) => {
            return books.find(book => book.id === id)
        }

    },
    Mutations: {
        create: (_, {id, title, author, publishedAt}) => {
            const book = {
                id,
                title,
                author,
                publishedAt
            }
            books.push(book)
            return book
        }
    },
    delete: (_, {id}) => {
        const filterdBooks = books.filter(book => book.id !== id)
        books = filterdBooks
        return true;
    },
    update: (_, {id, title, author, publishedAt}) => {
        const book = books.find(book => book.id === id)
        book.id = id;
        book.title = title ? title : book.title;
        book.author = author ? author : book.author;
        book.publishedAt = publishedAt ? publishedAt : book.publishedAt;
        return book
    }
}

// CREATE SERVER

// RUN SERVER