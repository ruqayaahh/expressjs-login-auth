const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  {
    // id: 1
    firstname: "Ruqayaah",
    lastname: "Sabitu",
    email: "aderinolaruqayaah@gmail.com",
    password: "January14",
  },
  {
    // id: 2,
    firstname: "Abigail",
    lastname: "Folarin",
    email: "af@gmail.com",
    password: "January18",
  },
  {
    // id: 3,
    firstname: "Lani",
    lastname: "Oluwajuyitan",
    email: "lo@gmail.com",
    password: "January22",
  },
  {
    // id: 4,
    firstname: "Modupe",
    lastname: "Falodun",
    email: "mf@gmail.com",
    password: "January26",
  },
  {
    // id: 5,
    firstname: "Peculiar",
    lastname: "Erhis",
    email: "pe@gmail.com",
    password: "January30",
  },
];

app.get("/users", (req, res) => res.status(200).json(users));

// when registering
app.post("/users/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Please fill in all your details",
    });
  }
  if (users.find((el) => el.email == email)) {
    return res.status(400).json({
      status: "Failed",
      message: "Email already exists",
    });
  }
  users.push(req.body);
  res.status(201).json({
    status: "Successful",
    message: "Your account has been successfully created",
  });
});

app.use("/users/:email", (req, res, next) => {
  const { email } = req.params;
  const currentUser = users.find((el) => el.email === email);
  if (currentUser) {
    req.data = currentUser;
    return next();
  }
  res.status(404).json({
    status: "Failed",
    message: "Account does not exist. Kindly login",
  });
});
// when logging in
app.get("/users/:email", (req, res) => {
  const { password } = req.body;
  if (currentUser.password === password) {
    req.body = { email, password };
    req.data = { firstname, lastname, email, password }
    if(req.body.firstname === req.data.lastname && req.body.lastname === req.data.lastname){
    return res.status(200).json({
      status: "Successfully logged in",
      message: "User fetched successfully",
      data: req.body,
    });
  }
  res.status(401).json({
    status: "Unauthorized login",
    message: "Email or password is incorrect",
  });
};

// when editing password
app.put("/users/:email", (req, res) => {
  const currentUser = { ...req.data, password: req.body.password };
  const index = users.findIndex((el) => el.email === email);
  users[index] = currentUser;
  res.status(200).json({
    status: "Successful changed password",
    message: `Password updated successfully`,
    data: currentUser,
  });
});

// when editing firstname
app.put("/users/:email", (req, res) => {
  const currentUser = { ...req.data, firstname: req.body.firstname };
  const index = users.findIndex((el) => el.email === email);
  users[index] = currentUser;
  res.status(200).json({
    status: "Successful changed firstname",
    message: `Password updated firstname`,
    data: currentUser,
  });
});


app.listen(3000);
