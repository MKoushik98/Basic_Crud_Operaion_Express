// Import express
const express = require("express");
const cors=require('cors')
const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middleware to parse JSON request body
app.use(express.json());

// Fake in-memory "database"
let users = [
  { id: 1, name: "Koushik", email: "koushik@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" }
];

// ================= CRUD Routes =================

// READ (Get all users)
app.get("/users", (req, res) => {
  res.json(users);
});

// READ (Get single user by ID)
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// CREATE (Add new user)
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE (Update existing user)
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});

// DELETE (Remove user)
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Live Api Url
// get=>https://basic-crud-operaion-express.onrender.com/users
// post=>https://basic-crud-operaion-express.onrender.com/users=>Parameter required
// put=>https://basic-crud-operaion-express.onrender.com/users/:id=>Parmeter required
// delete=>https://basic-crud-operaion-express.onrender.com/users/:id=>Parameter required
