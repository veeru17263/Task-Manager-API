const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const user = mongoose.model('user',{
//     name: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//             if(!validator.isEmail(value))
//                 throw new Error('email is invalid')
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes('password'))
//                 throw new Error('Password cannot contain password')
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0)
//             throw new Error('age must be positive')
//         }
//     }
// })

// // const me = new user({
// //     name: '   veeru   ',
// //     email: 'veeru@gmail.com     ',
// //     password: 'veer@123'
// // })

// // me.save().then(() => {
// //     console.log(me)
// // }).catch((error) => {
// //     console.log(error)
// // })


// const task = mongoose.model('task',{
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// }) 

// const task1 = new task({
//     description: '  Play cricket  ',
//     completed: true
// })

// task1.save().then(() => {
//     console.log(task1)
// }).catch((error) => {
//     console.log(error)
// })