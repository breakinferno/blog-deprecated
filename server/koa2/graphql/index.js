// 这块可以单独拆分出去

import {
  ApolloServer,
  gql
} from 'apollo-server-koa'

// The GraphQL schema
const typeDefs = gql `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'hello world',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server