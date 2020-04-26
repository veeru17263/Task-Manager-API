const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task.js')

const userschema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password'))
                throw new Error('Password cannot contain password')
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
            throw new Error('age must be positive')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
})

userschema.virtual('tasks',{
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

userschema.methods.generatetoken = async function() {
    const user = this

    const token = await jwt.sign({_id: user.id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token}) 
    await user.save()

    return token

}

userschema.methods.toJSON = function() {
    const user = this
    const userobject = user.toObject()

    delete userobject.password
    delete userobject.tokens
    delete userobject.avatar

    return userobject
}

userschema.statics.findbycredentials = async function(email,password) {
        const user = await this.findOne({ email })
        
        if(!user)
        {
            throw new Error('Unable to login')
        }

        const ismatch = await bcrypt.compare(password,user.password)

        if(!ismatch)
        {
            throw new Error('Unable to login')
        }
     
        return user
}

userschema.pre('save',async function(next) {
    const user = this

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)

    }

    next()
})

userschema.pre('remove',async function(next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})


const user = mongoose.model('user',userschema)

module.exports = user