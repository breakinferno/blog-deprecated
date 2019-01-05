// 这块可以单独拆分出去

import {
  ApolloServer,
  gql
} from 'apollo-server-koa'

import resolvers from './resolvers'
import defs from './typeDefs'

let typeDefs = gql `${defs}`
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server