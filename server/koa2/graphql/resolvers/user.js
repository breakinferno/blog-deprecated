import Services from '../../services'
import { graphqlHanlder } from '../../lib'
const { User } = Services
export default {
    Query: {
        user: async (root, { id }) => {
            let ret = await User.GetByID(id)
            return graphqlHanlder(ret)
        }
    },
    Mutation: {
        addUser: async (root, { input }) => {
            let ret = await User.Create(input)
            return graphqlHanlder(ret)
        },
        deleteUser: (root, { id }) => {
            User.Delete(id)
        }
    },
    User: {
        avatar: () => "test"
    },
    Gendor: {
        FEMALE: "female",
        MALE: "male"
    }
}