import {
  GraphQLScalarType
} from 'graphql'
import {
  Kind
} from 'graphql/language'
import mongoose from 'mongoose'

import User from './user'
import {
  composeResolver
} from '../../lib'
const ObjectId = mongoose.Types.ObjectId

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Type',
  serialize(value) {
    return value.getTime() // value sent to the client
  },
  parseValue(value) {
    return new Date(value) // value from the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null;
  }
});

const ObjectIdType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'ObjectId Type',
  serialize(value) {
    return value.toString()
  },
  parseValue(value) {
    return new ObjectId(value) // value from the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value) // ast value is always in string format
    }
    return null;
  }
});

let resolvers = {
  ObjectId: ObjectIdType,
  Date,
  ...composeResolver([User])
}



export default resolvers