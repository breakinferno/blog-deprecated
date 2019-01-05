import Services from '../../services'

const {
  User
} = Services
export default {
  Query: {
    user: (root, {
      nick
    }) => {
      return User.GetByNick(nick)
    }
  },
  Mutation: {
    addUser: (root, args) => {
      User.Create(args)
    }
  }
}