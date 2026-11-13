const express = require("express");

const app = express();

app.use(express.json());

// Sample user data
const users = [
    { id: 1, name: "Nagaraju", email: "nagaraju@example.com" },
    { id: 2, name: "Rahul", email: "rahul@example.com" }
];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to SonarQube Demo Application");
});

// Get all users
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// Create a user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

module.exports = app;
