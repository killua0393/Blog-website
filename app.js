//initializes everything
const express=require("express")
const bodyParser=require("body-parser")
const userRouter=require("./router.js")
const dbConnect=require("./db.js")

const app=express()
const port=5000;
dbConnect()

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// In-memory data store with 3 existing posts
let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry...",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
      viewcount: 50,
      commentcount: 5,
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content: "Artificial Intelligence (AI) is no longer a concept of the future...",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
      viewcount: 50,
      commentcount: 5,
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content: "Sustainability is more than just a buzzword; it's a way of life...",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
      viewcount: 50,
      commentcount: 5,
    },
  ];
  
// Use Routes
app.use(userRouter);

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });