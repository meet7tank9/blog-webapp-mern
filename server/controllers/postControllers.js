const Post = require("../models/postModel")
const User = require("../models/userModel")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const HttpError = require("../models/errorModel")





// Create A POST
// POST : api/posts
// Protected
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Fill all fields and choose thumbnail", 422))
        }

        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail size should be less than 2mb."))
        }

        let fileName = thumbnail.name;
        let splittedFileName = fileName.split('.');
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1];
        thumbnail.mv(path.join(__dirname, "..", '/uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFileName, creator: req.user.id })
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created", 422))
                }

                // find user and increate post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })

                res.status(201).json(newPost);
            }
        })

    } catch (error) {
        return next(new HttpError(error))
    }
}


// GET POSTS
// GET : api/posts/
// Protected
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 })

        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// Get A SINGLE POST
// GET : api/post/:id
// Protected
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return next(new HttpError("Post not found", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
// UnProtected
const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// GET USERS POSTS
// GET : api/posts/users/:id
// UnProtected
const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// EDIT POST
// PATCH : api/posts/:id
// Protected
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFileName;
        let updatedPost;
        const postId = req.params.id;
        let { title, category, description } = req.body

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill all fields", 422))
        }

        if (!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true })
        } else {
            // get old post from database
            const oldPost = await Post.findById(postId)

            fs.unlink(path.join(__dirname, "..", "uploads", oldPost.thumbnail), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
            })


            // upload new thumbnail
            const { thumbnail } = req.files;

            // check file size
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail size should be less than 2mb"))
            }
            fileName = thumbnail.name;
            let splittedFileName = fileName.split(".")
            newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1]
            thumbnail.mv(path.join(__dirname, "..", "uploads", newFileName), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                }

            })
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFileName }, { new: true })
        }

        if (!updatedPost) {
            return next(new HttpError("Couldn't update the post", 400))
        }

        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// DELETE POST
// DELETE : api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable", 400))
        }
        const post = await Post.findById(postId)
        const fileName = post?.thumbnail;
        if (req.user.id == post.creator) {

            // delete thumbnail from uploads folder 
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
                else {
                    await Post.findByIdAndDelete(postId)

                    // find user and reduce post count by 1
                    const currentUser = await User.findById(req.user.id)
                    const userPostCount = currentUser?.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
                    res.json(`Post ${postId} deleted successfully.`)
                }
            })
        }
        else{
            return next(new HttpError("Post couldn't be deleted", 403))
        }
    } catch (error) {

    }
}

module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }