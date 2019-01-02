import User from '../../model/user'
module.exports = {
  Query: {
    rooms: (root, args, context, info) => {
      return Room.find({})
    },
    user: (root, args) => {
      return
    }
  },
  Mutation: {

  }
}