// src/controllers/userController.js
const db = require("./dbConnection");

function generateId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function createUser(request, response) {
  const userData = request.body;
  userData["id"] = generateId(10);
  try {
    await db.addUser(userData);
    response.json({ message: "User added", success: true });
  } catch (error) {
    response.status(500).json({ error: "Internal server error." });
  }
}

async function getAllUsers(request, response) {
  try {
    response.json({
      message: "Users retrieved",
      success: true,
      users: await db.getAllUsers({}),
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error." });
  }
}

async function getUserById(request, response) {
  const UserId = request.params.id;

  try {
    const result = await db.getUserById({ id: UserId });
    if (result) {
      response.json({ success: true, user: result });
      return;
    } else {
      response.status(404).json({ message: "User not found", success: false });
      return;
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error. here" });
  }
}

async function updateUser(request, response) {
  const { email, firstName } = request.body;
  const id = request.params.id;
  let result = await db.getUserById({ id: id });

  if (!result) {
    response.status(404).json({ message: "User not found", success: false });
    return;
  }

  if (email) {
    result.email = email;
  }

  if (firstName) {
    result.firstName = firstName;
  }

  try {
    await db.updateUser({ id: id }, result);
    response.json({ message: "User updated", success: true });
  } catch (error) {
    response.status(500).json({ error: "Internal server error." });
  }
}

async function deleteUser(request, response) {
  const id = request.params.id;
  const deleteQuery = { id: id };

  try {
    const result = await db.deleteUser(deleteQuery);

    if (result) {
      response.json({ success: true, message: "User deleted" });
      return;
    } else {
      response.status(404).json({ message: "User not found", success: false });
      return;
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error. here" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
