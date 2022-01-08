const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");

const app = express();

/*

ID
String
Int
Float
Boolean
List - []
*/

let message = "This is a message";

const schema = buildSchema(`
    type Post {
        userId: Int
        id: Int
        title: String
        body: String

    }
    type User {
        name: String
        age: Int
        collage: String
        result: String
    }

    type Query {
        hello: String!
        welcomeMessage(name: String, dayOfWeek: String!): String
        getUser: User
        getUsers: [User]
        getPostFromExternalAPI: [Post]
        message: String
    }

    input UserInput {
        name: String!
        age: Int!
        collage: String!
        result: String!

    }

    type Mutation {
        setMessage (newMessage: String): String
        createUser(user: UserInput): User
    }


`);

const root = {
  hello: () => {
    // return 'Hello World'
    return "Hello World";
  },
  welcomeMessage: (args) => {
    return `Hey ${args.name}, hows life, todays is ${args.dayOfWeek}`;
  },
  getUser: () => {
    const User = {
      name: "ArifuL  Islam",
      age: 29,
      collage: "Islamic Arabic University",
    };
    return User;
  },

  getUsers: () => {
    const users = [
      {
        name: "Abdullah Al Zarif",
        age: 23,
        collage: "Computer",
      },
      {
        name: "Assadullah Al Labib",
        age: 11,
        collage: "Baby",
      },
    ];
    return users;
  },
  getPostFromExternalAPI: async () => {
    // return axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((result) => result.data);

    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return result.data;
  },
  setMessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
  message: ()=>message,

  createUser: (args)=>{
    // Create a new user inside db or external api or event firestore

    console.log(args);

    return args.user;
  }

};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => {
  console.log(` Server non port 4000`);
});

// http://localhost:4000/graphql


//38:21