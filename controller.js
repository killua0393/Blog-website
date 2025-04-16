//controller.js
//It acts as the middleman between your EJS views (frontend) and your backend API (index.js).
const Post= require('./userschema.js')//importing usercshema

async function getPosts(req,res)
{
    try{
        const posts=await Post.find()
        console.log("Fetched posts:", posts); // Debug log

        res.render('posts',{posts})//rendering post.ejs
    }
    catch(error)
    {
        res.status(500).json({eroor:"error fetching posts"})
    }
}
async function getPostById(req,res)
{
    try{
        const posts=await Post.findById(req.params.id)
        res.render('modify',{
            haeding:"Edit Post",
            submit:"Update Post",
            posts,
        })//rendering modify.ejs
    }
    catch(error)
    {
        res.status(500).json({eroor:"error fetching posts"})
    }
}
async function createPost(req,res){
    try{
        const newPost=await Post.create(req.body);
        res.redirect('/posts');
    }
    catch(error){
        res.status(500).json({ message: "Error creating post" });

    }
}
//update a post
async function updatePost(req,res){
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.redirect('.posts')
    }
    catch(error){
        res.status(500).json({ message: "Error updating post" });

    }
}
//delete a post
async function deletePost(req,res){
    try{
    const deletepost=await Post.findByIdAndDelete(req.param.id)
    res.redirect('/posts')
    }
    catch{
        res.status(500).json({message:"error deleting post"})

    }
}

module.exports={
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
}
