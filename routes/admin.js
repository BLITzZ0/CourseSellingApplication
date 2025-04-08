const { Router } = require("express");
const adminMiddleware = require("../Middleware/admin");
const {Admin, Course} = require("../DB")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    //checking if a user exist with this credential
    Admin.create({
        username,
        password
    })
    
    res.json({
        message:"Admin created Sucessfully"
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price =req.body.price;
    const imagelink  = req.body.imagelink  
    const newCourse = await Course.create({
        title: title,
        description: description,
        price: price,
        imagelink: imagelink
    })
    console.log(newCourse)
    res.json({
        Message: "Course Created Sucessfully", courseId : newCourse._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({})
    res.json({
        courses: allCourses
    })
    console.log(allCourses)

});

module.exports = router;