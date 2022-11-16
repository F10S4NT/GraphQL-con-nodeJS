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
    getCourse(id: ID!): Course 
  }

  type Mutation{
    addCourse(title: String!, views: Int): Course
    updateCourse(id: ID!,title: String!, views: Int): Course
  }
`);//template string

const root = {
    getCourses(){
        return courses;
    },
    getCourse({ id }){
        console.log();
        const course = courses.find( (course)=> id == course.id);
        return course;
    },
    addCourse({title, views}){
        const id = String(courses.length +1);
        const course = {id, title, views};
        courses.push(course);
        return course;
    },
    updateCourse({id, title, views}){
        const courseIndex = courses.findIndex((courses)=> id ===course.id);
        const course = courses[courseIndex];

        const newCourse = Object.assign(course,{title, views});
        course[courseIndex] = newCourse;

        return newCourse;
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