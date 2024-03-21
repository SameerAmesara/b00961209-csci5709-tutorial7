const userController = require("./userController");
const express = require("express");

const app = express();
app.use(express.json());

// GET all users
app.get("/users", userController.getAllUsers);

// Update given user
app.put("/update/:id", userController.updateUser);

// Add new user
app.post("/add", userController.createUser);

// Retrieve given user
app.get("/user/:id", userController.getUserById);

// Delete given user
app.delete("/delete/:id", userController.deleteUser);

app.listen(6000, () => {
  console.log("Application is running on PORT : 6000");
});
