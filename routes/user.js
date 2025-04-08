const { Router } = require("express");
const router = Router();
const {User, Course} = require("../DB")
const userMiddleware = require("../Middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password = req.body.password;

    User.create({
        username: username,
        password: password
    })
    res.json({
        Message : "User Created Sucessfully"
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    //update in the middle itself
    
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    //Const allCourses = await Course.find({ })//get all fields from the database
    const allCourses = await Course.find({}, 'title description price');//find only specific fields
    res.json({
        course : allCourses
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    console.log(courseId);
    const username = req.headers.username
    console.log(username)

    try{
        await User.updateOne(
            {username:username }, 
            { "$push": { purchasedCourses: courseId }}
        );
        res.json(
            {message : "Purchase Sucessfull"}
        )
    }catch(e){
        res.status(403).json({message:"Fix the code"});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    //console.log(user.username)

    const courses = await Course.find({
            _id:
            {
                "$in" :user.purchasedCourses
            }
        })
    res.json({
        course: courses
    })
});

module.exports = router