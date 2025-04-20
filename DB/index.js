const mongoose = require("mongoose");

 mongoose.connect("mongodb URL")
 .then( ()=>{
   console.log("Connection Sucessfull")
 })
 .catch((err)=>{
   console.error("Connection have a problem")
 });

 const AdminSchema = new mongoose.Schema({
    username: String,
    password:String
 });

 const userSchema = new mongoose.Schema({
    username: String,
    password:String,
    purchasedCourses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
 });

 const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imagelink:String,
    price:Number
 });

 const Admin = mongoose.model('Admin',AdminSchema);
 const User = mongoose.model('User',userSchema);
 const Course = mongoose.model('Course',CourseSchema);

 module.exports = {
   Admin,
   User,
   Course
};
        
//mongodb+srv://ababhishek3005:GjlDhFVHFVEk4Wu8@courseselling.wo4d7zg.mongodb.net/
