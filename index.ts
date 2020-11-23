import * as Koa from "koa";
import * as koaLogger from "koa-logger";
import * as Router from "koa-router";
import {buildSchema} from "graphql";
import {ApolloServer, gql} from "apollo-server-koa";
import * as mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'Password123$',
    database:'user'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const typeDefs = gql`
    type User
    {
        name: String!
        id: ID
    } 
    type Query{
        users: [User]
    }
`;

// type User = {
//     name: String,
//     id: Int16Array
// };



const post  = {ID: 9, NAME: 'Hello MySQL'};

const query = connection.query('INSERT INTO user.User SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
  });

const value = connection.query({sql:'SELECT * FROM user.User'}, function(error, result, fields)
{
    if (error) throw error;
    console.log(result);
    // console.log(fields);
});

console.log(value.sql);
console.log(query.sql);






const resolvers = {
    Query: {
        users: () => Users,
    },  
};



const Users = [
    {
        name: 'Daniel',
        id: 1 
    },
    {
        name: 'Bob',
        id: 2
    }

];

const server = new ApolloServer({typeDefs, resolvers});
const app = new Koa();
const router = new Router();



server.applyMiddleware({app});

router.get("/", async (ctx, next) => {
    ctx.body = {msg: "Server Runninng :) "}
});

app.use(router.routes()).use(router.allowedMethods());


app.listen(80,() => {
	console.log("Server Listening On Port::80");
});
