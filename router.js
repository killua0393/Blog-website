//This is where you define the routes for your frontend application. It maps URLs to the appropriate controller functions.
const express = require('express')
userrouter=express.Router()
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    

}=require('./controller.js')
userrouter.get('/posts',getPosts)
userrouter.get('/newpost', (req, res) => {
    res.render('newpost', { heading: "Newpost", submit: "Create Post" });//for fetching the newuser ejs
  });
userrouter.post('/api/posts', createPost);//when the user submits the new post
userrouter.get('/api/posts/delete/:id', deletePost);
userrouter.get('/edit/:id', getPostById);
userrouter.post('/edit/:id', updatePost);

userrouter.get('/stats', (req, res) => res.render('stats'));
userrouter.get('/comments', (req, res) => res.render('comments'));
userrouter.get('/earnings', (req, res) => res.render('earnings'));
userrouter.get('/pages', (req, res) => res.render('pages'));
//userrouter.post('/layout', (req, res) => res.render('layout'));


module.exports=userrouter

