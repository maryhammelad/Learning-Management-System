var bodyParser = require('body-parser');
const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const router = express.Router();
var fs = require('fs');
var http = require('http');
var url = require('url');
const { resolveSoa } = require('dns');
var urlbp=bodyParser.urlencoded({extend:false});




app.get('/web/courses/create',(req,res)=>{

    var filename = "course.html";
fs.readFile(filename, function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});

});

app.post('/web/courses/create',urlbp,(req,res)=>{


    const {error}= validateCourse(req.body);

if(error){
    res.status(400).send(error.details[0].message);
    return;

}   

     const addcourse ={
         id: courses.length +1,
         name: req.body.name,
         code: req.body.code,
         description: req.body.description,
     };
courses.push(addcourse);
res.send(addcourse);

});



app.get('/web/students/create',(req,res)=>{

    var filename = "student.html";
fs.readFile(filename, function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});

});

app.post('/web/students/create',urlbp,(req,res)=>{


    const {error}= validateStudent(req.body);

if(error){
    res.status(400).send(error.details[0].message);
    return;

}   

     const addstudent ={
         id: students.length +1,
         name: req.body.name,
         code: req.body.code,
     };
students.push(addstudent);
res.send(addstudent);

});




//data

const courses =[
  
     {id:1, name:"Database",code:"CSE433",description:"First Electrical year"},
     {id:2, name:"Networks",code:"CSE451",description:"Third Electrical year"},
     {id:3, name:"Data structure",code:"CSE467",description:"Fourth Electrical year"},
 
];

const students  =[
  
     {id:1, name:"Maryham",code:"1601075"},
     {id:2, name:"Mary",code:"1601076"},
     {id:3, name:"Ahmed",code:"1601077"},
 
];

function validateCourse(course){

     const schema = {
         name: Joi.string().min(5).required(),
         code: Joi.string().regex(/^[A-Z]{3}[0-9]{3}$/).required(),
         description: Joi.string(),
     };

    return Joi.validate(course,schema);
     
}    

function validateStudent(student){

     const schema = {
         name: Joi.string().regex(/^[a-zA-Z-']*$/).required(),   
         code: Joi.string().min(7).max(7).required(),
     };

    return Joi.validate(student,schema);
     
}


app.get('/',(req,res)=>{

    
    var filename = "code.html";
     
fs.readFile(filename, function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});


});

app.get('/web/sourceCode',(req,res)=>{

    
    var filename = "sourceCode.html";
     
fs.readFile(filename, function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});


});

app.get('/api/courses',(req,res)=>{

    res.send(courses);



});




app.get('/api/courses/:id',(req,res)=>{

    const course =  courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
    res.status(404).send('The course with the id was not found');
    return;
}
res.send(course);
});

app.post('/api/courses/',(req,res)=>{



    const {error}= validateCourse(req.body);

if(error){
    res.status(400).send(error.details[0].message);
    return;

}    


     const addcourse ={
         id: courses.length +1,
         name: req.body.name,
         code: req.body.code,
         description: req.body.description,
     };
courses.push(addcourse);
res.send(addcourse);

});


app.put('/api/courses/:id',(req,res)=>{

    const course =  courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
    res.status(404).send('The course with the id was not found ');
    return;
}


     const {error}= validateCourse(req.body);

if(error){          
    res.status(400).send(error.details[0].message);
    return;
}
course.name =req.body.name;   
course.code=req.body.code;
course.description=req.body.description;
res.send(course); 

});

app.delete('/api/courses/:id',(req,res)=>{


    const course =  courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
    res.status(404).send('The course with the id was not found ');
    return;
}

     const index =courses.indexOf(course);
courses.splice(index,1);
     
res.send(course); 

});

app.get('/api/students',(req,res)=>{

    res.send(students);
});

 
app.get('/api/students/:id',(req,res)=>{

    const student =  students.find(c=>c.id===parseInt(req.params.id));
if(!student){
    res.status(404).send('The student with the id was not found');
    return;
}
res.send(student);
});

app.post('/api/students/',(req,res)=>{

    const {error}= validateStudent(req.body);

if(error){
    res.status(400).send(error.details[0].message);
    return;
}    

     const addstudent ={
         id: students.length +1,
         name: req.body.name,
         code: req.body.code,
     };
students.push(addstudent);
res.send(addstudent);

});

     
app.put('/api/students/:id',(req,res)=>{

    const student =  students.find(c=>c.id===parseInt(req.params.id));
if(!student){
    res.status(404).send('The student with the id was not found ');
    return;
}


     const {error}= validateStudent(req.body);

if(error){          
    res.status(400).send(error.details[0].message);
    return;
}
student.name =req.body.name;   
student.code =req.body.code;
res.send(student); 

});

app.delete('/api/students/:id',(req,res)=>{


    const student =  students.find(c=>c.id===parseInt(req.params.id));
if(!student){
    res.status(404).send('The student with the id was not found ');
    return;
}

     const index =students.indexOf(student);
students.splice(index,1);
res.send(student); 

});



const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`lisening ${port}`));