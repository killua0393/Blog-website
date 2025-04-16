// index.js
//backend api
// Creating my own API
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry...",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
    viewcount: "50",
    commentcount: "5",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future...",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
    viewcount: "50",
    commentcount: "5",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life...",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
    viewcount: "50",
    commentcount: "5",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function for date formatting
function getCurrentDateTime() {
  const today = new Date();
  return today.toISOString(); // Returns ISO 8601 format
}

// CHALLENGE 1: GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// CHALLENGE 2: GET a specific post by ID
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  res.json(foundPost);
});

// Editing a post
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  res.json(foundPost);
});

// CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  let nextId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;

  const newPost = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: getCurrentDateTime(),
    viewcount: 0,
    commentcount: 0,
  };

  posts.push(newPost);
  res.json(newPost);
});

// CHALLENGE 4: PATCH a post (update one or more fields)
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return res.status(404).send("Post not found");

  posts[index] = {
    ...posts[index],
    title: req.body.title || posts[index].title,
    content: req.body.content || posts[index].content,
    author: req.body.author || posts[index].author,
    date: getCurrentDateTime(),
  };

  res.json(posts[index]);
});

// CHALLENGE 5: DELETE a post by ID
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return res.status(404).send("Post not found");

  posts.splice(index, 1);
  res.status(200).send("Post deleted");
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
