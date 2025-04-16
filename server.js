// server.js
// accessing its API

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios"); // vip

//const __dirname = path.dirname(__filename);

const app = express();
const port = 5500;
const API_URL = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("posts", { posts: response.data });
  } catch (error) {
    res.status(500).json({ error: "fetching posts" });
  }
});

// page that pops up for new post
app.get("/newpost", async (req, res) => {
  res.render("newpost.ejs", { heading: "Newpost", submit: "Create Post" });
});

// after clicking submit for new post, the post is added to posts
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// deleting a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deleteUrl = `${API_URL}/posts/${postId}`;
    console.log("Deleting post at URL:", deleteUrl); // Log the delete URL

    // Delete the post using the ID from the request parameters
    const deleteResponse = await axios.delete(deleteUrl);
    console.log("Delete Response:", deleteResponse.data); // Log the delete response

    // Fetch all posts after deletion
    const response = await axios.get(`${API_URL}/posts`);
    const allPosts = response.data;
    console.log("Current posts after deletion:", allPosts);

    // Redirect to the posts page
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Error deleting the post" });
  }
});

// page that pops up for edit page option
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// when clicked on the sidebar(stats), I want stats.ejs to open
app.get("/stats", (req, res) => {
  res.render("stats"); // this will render stats.ejs file
});

app.get("/comments", (req, res) => {
  res.render("comments");
});

app.get("/earnings", (req, res) => {
  res.render("earnings");
});

app.get("/pages", (req, res) => {
  res.render("pages");
});

app.post("/layout", (req, res) => {
  res.render("layout");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
