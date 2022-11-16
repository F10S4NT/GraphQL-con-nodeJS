const express = require('express')
const {buildSchema} = require('graphql')

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

app.get('/', function(req, res){
    res.send(("Bienvenido"));
});

app.listen(8080, function(){
    console.log("Servidor inciado");
});