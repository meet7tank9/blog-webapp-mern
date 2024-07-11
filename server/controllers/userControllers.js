const bcrypt = require('bcryptjs')
const fs = require("fs")
const jwt = require("jsonwebtoken")
const path = require("path")
const { v4: uuid } = require('uuid')

const HttpError = require('../models/errorModel')
const User = require("../models/userModel")

// Register a new user : 
// POST: api/users/register
// Unprotected
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, cPassword } = req.body
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }
        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({ email: newEmail })

        if (emailExists) {
            return next(new HttpError("Email already exists", 422))
        }

        if ((password.trim()).length < 8) {
            return next(new HttpError("Password should be at least 8 characters", 422))
        }

        if (password != cPassword) {
            return next(new HttpError("Both password should be matched", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({ name, email: newEmail, password: hashedPass })

        res.status(201).json(`New User ${newUser.email} registered.`)
    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}



// Login a registered user :
//  POST: api/users/login
// Unprotected
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError("Fill all fields", 422))
        }
        const newEmail = email.toLowerCase()

        const user = await User.findOne({ email: newEmail })
        if (!user) {
            return next(new HttpError("Invalid email or password", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return next(new HttpError("Invalid email or password", 422))
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({ token, id, name })
    } catch (error) {

        return next(new HttpError("Login failed.", 422))
    }
}


// User profile : 
// POST: api/users/:id
// Protected
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select(`-password`);

        if (!user) {
            return next(new HttpError("User not found", 404))
        }

        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// Change User avatar : 
// POST: api/users/change-avatar
// Protected
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files.avatar) {
            return next(new HttpError("Please choose an image", 422))
        }

        // find user from database
        const user = await User.findById(req.user.id)
        // delete old avatar if exists
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
            })
        }

        const { avatar } = req.files

        // check file size
        if (avatar.size > 500000) {
            return next(new HttpError("Profile picture should be less than 500kb", 422))
        }

        let fileName;
        fileName = avatar.name

        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err))
            }
            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFileName }, { new: true })
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 422))
            }
            res.status(200).json(updatedAvatar)
        })
        console.log(req.files)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// Edit user details : 
// POST: api/users/edit-user
// Protected
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, newConfirmPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill all fields", 422))
        }

        // get user from database
        const user = await User.findById(req.user.id)
        if (!user) {
            return next(new HttpError("User not found", 403))
        }

        // make sure new email doesn't already exist.
        const emailExist = await User.findOne({ email });
        // we want to update other details with/without changing the email (which is a unique id because we use it to login).
        if (emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exists.", 422))
        }

        // compare current password to db password.
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid current password", 422))
        }

        // compare new passwords
        if (newPassword != newConfirmPassword) {
            return next(new HttpError("New passwords do not match.", 422))
        }

        // hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        // update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash }, { new: true })
        
        res.status(200).json(newInfo);
    } catch (error) {
        return next(new HttpError(error))
    }
}


// Get authors : 
// POST: api/users/authors
// Unprotected
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select(`-password`)
        if (!authors) {
            return next(new HttpError("Authors not found", 422))
        }
        
        return res.status(200).json(authors)
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }