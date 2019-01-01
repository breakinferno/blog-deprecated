// 引入模块
import Koa from 'koa'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import {
    ApolloServer,
    gql
} from 'apollo-server-koa'

import auth from './middleware/auth'
import {
    System
} from './config'
import db from './db'
import routes from './router'

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
        hello: () => 'world',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = new Koa()
server.applyMiddleware({
    app
});

const env = process.env.NODE_ENV || 'development' // Current mode

if (env === 'development') { // logger
    app.use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })
}
db.start();
app.use(auth())
// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));
console.log(routes)
app.use(routes)

app.listen(System.port);

console.log('graphQL server listen port: ' + System.port)
console.log('please visit the url: http://localhost:' + System.port + '/graphql')