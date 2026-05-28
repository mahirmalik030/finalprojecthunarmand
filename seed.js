const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');

dotenv.config();

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms');

        // Get any user to be the instructor
        let instructor = await User.findOne({ role: 'instructor' });
        if (!instructor) {
             instructor = await User.findOne();
             if (!instructor) {
                 // create a dummy instructor
                 instructor = await User.create({
                     name: 'Demo Instructor',
                     email: 'demo@instructor.com',
                     password: 'password123',
                     role: 'instructor'
                 });
             }
        }

        const courses = [
            {
                title: 'Fullstack Web Development Bootcamp',
                description: 'Learn MERN stack from scratch and build real world projects. Master HTML, CSS, JS, React, Node, and MongoDB.',
                category: 'web dev',
                price: 14000,
                instructor: instructor._id,
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Advanced UI/UX Design Principles',
                description: 'Build stunning 3D responsive UI. Learn Figma, prototyping, liquid glass, and transparent layouts.',
                category: 'ui ux design',
                price: 16500,
                instructor: instructor._id,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Graphic Design Masterclass',
                description: 'Create beautiful posters, logos, and graphics using Photoshop, Illustrator, and more. Become a pro graphic designer.',
                category: 'graphic design',
                price: 11000,
                instructor: instructor._id,
                thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Video Editing for Beginners',
                description: 'Learn Premiere Pro, After Effects, and DaVinci Resolve. Edit videos like a youtube pro and create cinematic sequences.',
                category: 'video edit',
                price: 8500,
                instructor: instructor._id,
                thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
            }
        ];

        await Course.deleteMany({});
        await Course.insertMany(courses);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

seedCourses();
