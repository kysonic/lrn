var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Person {
        id: ID!
        name: String!
        age: Int!
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        author: Person!
    }
    type Query {
        allPersons(last: Int): [Person!]!
        allPosts(last: Int): [Post!]!
    }
    type Mutation {
        createPerson(name: String!, age: Int!): Person!
        updatePerson(id: ID!, name: String!, age: Int!): Person!
        deletePerson(id: ID!): Person!
        createPost(title: String!): Post!
        updatePost(id: ID!, title: String!): Post!
        deletePost(id: ID!): Post!
    }
    type Subscription {
        newPerson: Person!
        newPost: Post!
        updatedPerson: Person!
        updatedPost: Post!
        deletedPerson: Person!
        deletedPost: Post!
    }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
