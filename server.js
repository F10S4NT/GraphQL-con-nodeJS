const express = require('express')
const {buildSchema} = require('graphql')
const expressGraphQL = require('express-graphql')


let courses = require('./courses');
const app = express();

// esquema de graphql
const schema = buildSchema(`
  type Course {
    id: ID
    title: String!
    views: Int
  }

  input CourseInput{
    title: String!
    views: Int
  }

  type Alert{
    message: String
  }

  type Query{
    getCourses: [Course]
    getCourse(id: ID!): Course 
  }

  type Mutation{
    addCourse(input: CourseInput): Course
    updateCourse(id: ID!, input: CourseInput): Course
    deleteCourse(id: ID!): Alert
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
    addCourse({input}){
        const id = String(courses.length +1);
        const course = {id, ...input};
        courses.push(course);
        return course;
    },
    updateCourse({id, input}){
        const courseIndex = courses.findIndex((course)=> id ===course.id);
        const course = courses[courseIndex];

        const newCourse = Object.assign(course, input);
        course[courseIndex] = newCourse;

        return newCourse;
    },
    deleteCourse({id}){
        courses = courses.filter((course)=> course.id != id);

        return{
            mesage: "curso eliminado"
        }
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