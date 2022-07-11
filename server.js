const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

const app = express();
app.use(cors());
const users = [
  {
    id: 1,
    name: "Afolabi Oluwasegun",
    transactionType: "withdrawal",
    status: "pending",
    date: "4/3/2022",
  },

  {
    id: 2,
    name: "Olamilekan Ajala",
    transactionType: "deposit",
    status: "confirmed",
    date: "7/2/2022",
    // new Date().toLocaleDateString()
  },
  {
    id: 3,
    name: "Afolabi Tunji",
    transactionType: "withdrawal",
    status: "failed",
    date: "4/3/2022",
  },
  {
    id: 4,
    name: "Ajala Bode",
    transactionType: "deposit",
    status: "confirmed",
    date: "4/3/2022",
  },
  {
    id: 5,
    name: "Jim Paul",
    transactionType: "deposit",
    status: "confirmed",
    date: "7/1/2022",
  },
  {
    id: 6,
    name: "Benita Jay",
    transactionType: "deposit",
    status: "confirmed",
    date: "7/1/2022",
  },
  {
    id: 7,
    name: "Daniella Joy",
    transactionType: "withdrawal",
    status: "pending",
    date: "7/1/2022",
  },
  {
    id: 8,
    name: "John Terry",
    transactionType: "withdrawal",
    status: "failed",
    date: "7/1/2022",
  },
  {
    id: 9,
    name: "Samuel Rowe",
    transactionType: "withdrawal",
    status: "failed",
    date: "7/4/2022",
  },
  {
    id: 10,
    name: "Olanrewaju John",
    transactionType: "deposit",
    status: "failed",
    date: "7/4/2022",
  },
  {
    id: 11,
    name: "Kind David",
    transactionType: "deposit",
    status: "failed",
    date: "7/4/2022",
  },
  {
    id: 12,
    name: "Krissie Burgott",
    transactionType: "deposit",
    status: "pending",
    date: "7/1/2022",
  },
  {
    id: 13,
    name: "Alick Garretts",
    transactionType: "deposit",
    status: "confirmed",
    date: "7/4/2022",
  },
  {
    id: 14,
    name: "Donal Nacey",
    transactionType: "withdrawal",
    status: "failed",
    date: "7/1/2022",
  },
  {
    id: 15,
    name: "Michael Smith",
    transactionType: "deposit",
    status: "pending",
    date: "7/2/2022",
  },
  {
    id: 16,
    name: "Steve Harry",
    transactionType: "deposit",
    status: "confirmed",
    date: "7/1/2022",
  },
  {
    id: 17,
    name: "Will Smith",
    transactionType: "withdrawal",
    status: "failed",
    date: "7/1/2022",
  },
  {
    id: 18,
    name: "Brad Pitt",
    transactionType: "deposit",
    status: "pending",
    date: "7/5/2022",
  },
  {
    id: 19,
    name: "Eunice Smith",
    transactionType: "deposit",
    status: "pending",
    date: "7/5/2022",
  },
  {
    id: 20,
    name: "John Michael",
    transactionType: "withdrawal",
    status: "confirmed",
    date: "4/3/2022",
  },
];

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents lists of Users",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    transactionType: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: () => users,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server is running"));
