const express = require('express')
const {buildSchema} = require('graphql')
const expressGraphQL = require('express-graphql')
const courses = require('./courses');

const app = express();

// esquema de graphql
const schema = buildSchema(`
  type Course {
    id: ID
    title: String!
    views: Int
  }

  type Query{
    getCourses: [Course] 
  }
`);//template string

const root = {
    getCourses(){
        return courses;
    }
}

app.get('/', function(req, res){
    res.send(("Bienvenido"));
});

//midleware
app.use('/graphql', expressGraphQL.graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(8080, function(){
    console.log("Servidor inciado");
});